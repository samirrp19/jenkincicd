# app.py (or routes/game_routes.py)

from flask import Flask, request, jsonify
from typing import Dict, Any, List

app = Flask(__name__)

# ------------------------
# Dummy helper functions
# ------------------------

def build_prompt_template(user_prompt: str, user_options: Dict[str, Any]) -> str:
    """
    Step 2: Wrap the user's raw idea into a structured prompt template
    for the planner/game model.
    """
    # In real code, you'd inject game type, difficulty, assets, multiplayer options, etc.
    template = f"""
    You are an expert game developer using Phaser.js.
    User idea: {user_prompt}

    User options/context: {user_options}

    Generate a detailed game specification including:
    - game type and core loop
    - entities and their properties
    - rules, scoring, and win/loss conditions
    - states and transitions
    - inputs and controls
    - multiplayer flow (if selected)
    Respond in JSON only.
    """
    return template.strip()


def select_llm_model(task_type: str) -> str:
    """
    Step 3: Decide which model to use based on task_type.
    You can route to different providers/models here.
    """
    if task_type == "plan":
        return "planner-model-v1"
    elif task_type == "code":
        return "code-model-v1"
    elif task_type == "assets":
        return "assets-model-v1"
    else:
        return "default-model"


def generate_or_select_assets(game_spec: Dict[str, Any]) -> Dict[str, Any]:
    """
    Step 4: Generate images using a model OR select from stored assets.
    For now, we just return a fake asset manifest.
    """
    # Example: you might look at game_spec["visualStyle"], ["theme"], etc.
    return {
        "backgrounds": [
            {"id": "bg_pool_hall", "type": "stored", "path": "/assets/bg/pool_hall.png"}
        ],
        "sprites": [
            {"id": "ball_set_9", "type": "stored", "path": "/assets/sprites/balls_9.png"},
            {"id": "cue_default", "type": "stored", "path": "/assets/sprites/cue.png"},
        ],
        "sounds": [
            {"id": "sfx_hit", "type": "stored", "path": "/assets/sfx/hit.ogg"},
            {"id": "sfx_pocket", "type": "stored", "path": "/assets/sfx/pocket.ogg"},
        ]
    }


def generate_game_code(
    game_spec: Dict[str, Any],
    assets_manifest: Dict[str, Any],
    code_model_name: str
) -> Dict[str, str]:
    """
    Step 5: Call your code-generation LLM (or multiple models) to produce game code.
    Return a dict: { filepath: filecontent }
    """
    # In real code: use OpenAI / other LLM with the planner spec + assets manifest.
    # Here we just stub a minimal Phaser project structure.
    return {
        "src/main.js": "// Phaser game bootstrap (dummy)\n",
        "src/scenes/GameScene.js": "// Core 9-ball game scene logic (dummy)\n",
        "src/scenes/MenuScene.js": "// Menu scene (dummy)\n",
        "src/config/assetsConfig.js": f"// Asset manifest: {assets_manifest}\n",
        "package.json": """
        {
          "name": "codex-9ball-game",
          "version": "1.0.0",
          "scripts": {
            "start": "vite",
            "build": "vite build"
          },
          "dependencies": {
            "phaser": "^3.70.0"
          }
        }
        """
    }


def persist_game_project(
    user_id: str,
    project_id: str,
    code_files: Dict[str, str],
    assets_manifest: Dict[str, Any]
) -> str:
    """
    Step 6: Combine game asset and code.
    Write files to EFS (or local) under a workspace directory.
    Return the workspace path (or ID).
    """
    # In real implementation: write to /mnt/efs/users/{user_id}/projects/{project_id}/workspace_x/
    workspace_path = f"/efs/users/{user_id}/projects/{project_id}/workspace_9ball"
    # Pseudo-write files
    # for path, content in code_files.items():
    #     full_path = os.path.join(workspace_path, path)
    #     os.makedirs(os.path.dirname(full_path), exist_ok=True)
    #     with open(full_path, "w", encoding="utf-8") as f:
    #         f.write(content)

    # Also store assets_manifest as JSON
    # ...

    return workspace_path


def trigger_build_and_publish(workspace_path: str) -> Dict[str, Any]:
    """
    Step 7: Build and publish.
    Enqueue a job for your Codex watcher/rebuild worker,
    or directly call a build script (in dev).
    """
    # In real world: write .trigger_<timestamp> file or post to a queue.
    # Here we return a fake published URL.
    return {
        "buildStatus": "queued",   # or 'building', 'ready'
        "gameUrl": f"https://games.codex.example.com/play?ws={workspace_path}"
    }


# ------------------------
# Main Flask route
# ------------------------

@app.route("/api/games/create", methods=["POST"])
def create_game():
    """
    End-to-end flow:

    user prompt
      -> prompt template
      -> select model(s)
      -> generate images / select stored images
      -> generate game code
      -> combine game asset and code
      -> build and publish
      -> user starts playing (returns URL)
    """
    data = request.get_json(force=True) or {}

    # 1. User prompt & basic inputs
    user_prompt: str = data.get("prompt", "").strip()
    user_id: str = data.get("userId", "demo-user")
    project_id: str = data.get("projectId", "demo-project")
    user_options: Dict[str, Any] = data.get("options", {})

    if not user_prompt:
        return jsonify({"error": "prompt is required"}), 400

    # 2. Build prompt template (for planner/spec model)
    prompt_template: str = build_prompt_template(user_prompt, user_options)

    # 3. Select models for each stage
    planner_model = select_llm_model("plan")
    code_model = select_llm_model("code")
    assets_model = select_llm_model("assets")

    # --- in real flow, call planner_model via your LLM gateway ---
    # For now, we stub the game_spec:
    game_spec: Dict[str, Any] = {
        "title": "9 Ball Game (Generated)",
        "gameType": "9ball",
        "multiplayer": user_options.get("multiplayer", True),
        "rules": {
            "preset": "standard_9ball",
            "foulScratch": True,
            "noRailFoul": True
        },
        "visualStyle": user_options.get("visualStyle", "realistic"),
        "engine": "phaser3"
    }

    # 4. Generate images / select stored images (assets)
    assets_manifest: Dict[str, Any] = generate_or_select_assets(game_spec)

    # 5. Generate game code using selected code model
    code_files: Dict[str, str] = generate_game_code(
        game_spec=game_spec,
        assets_manifest=assets_manifest,
        code_model_name=code_model
    )

    # 6. Combine game asset and code (persist in workspace)
    workspace_path: str = persist_game_project(
        user_id=user_id,
        project_id=project_id,
        code_files=code_files,
        assets_manifest=assets_manifest
    )

    # 7. Build and publish (trigger your existing Codex build pipeline)
    publish_result: Dict[str, Any] = trigger_build_and_publish(workspace_path)

    # 8. Return URL so user can start playing
    response = {
        "status": "ok",
        "message": "Game generation pipeline started.",
        "plannerModel": planner_model,
        "codeModel": code_model,
        "assetsModel": assets_model,
        "workspacePath": workspace_path,
        "buildStatus": publish_result.get("buildStatus"),
        "gameUrl": publish_result.get("gameUrl"),
        "debug": {
            "promptTemplate": prompt_template[:500]  # optionally truncate
        }
    }
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(debug=True)
