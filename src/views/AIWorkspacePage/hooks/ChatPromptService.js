// 🔁 ChatPromptService.js
export const fetchPromptHistory = async ({ appId, workspaceId, userId, oneaiUrl }) => {
  const res = await fetch(
    `${oneaiUrl}/api/assistant/history?app_id=${appId}&workspace_id=${workspaceId}`,
    { headers: { "UserId": userId } }
  );
  return res.json();
};

export const generateImagePrompt = async ({ prompt, oneaiUrl, token, userId }) => {
  const res = await fetch(`${oneaiUrl}/api/story/image/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "UserId": userId,
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ prompt })
  });
  return res.json();
};

export const generateStoryVideo = async ({
  prompt,
  oneaiUrl,
  token,
  userId,
  efsPath,
  appId,
  workspaceId
}) => {
  const res = await fetch(`${oneaiUrl}/api/story/generate/story-video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      prompt,
      user_id: userId,
      efs_path: efsPath,
      project_id: appId,
      workspace_id: workspaceId,
      project_path: efsPath
    })
  });
  return res.json();
};

export const generateGameProject = async ({
  prompt,
  oneaiUrl,
  token,
  userId,
  appId,
  workspaceId,
  efsPath
}) => {
  const res = await fetch(`${oneaiUrl}/api/game/generate/game-project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      prompt,
      user_id: userId,
      project_id: appId,
      workspace_id: workspaceId,
      efs_path: efsPath
    })
  });
  return res.json();
};

export const uploadToS3 = async (file, apiUrl, token) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${apiUrl}/api/uploads/s3`, {
    method: 'POST',
    headers: {
      'x-auth-token': token
    },
    body: formData
  });

  return res.json();
};
