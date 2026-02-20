import React from "react";

const StoryVideoMessage = ({ message }) => {
  const { videoPath, scenes, story_id } = message;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-4">
      <h3 className="text-lg font-semibold mb-2">🎬 Generated Story Video</h3>
      <video controls className="w-full rounded">
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {scenes?.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-medium mb-1">📖 Story Scenes</h4>
          <ul className="grid grid-cols-2 gap-3">
            {scenes.map((scene, idx) => (
              <li key={idx} className="bg-white dark:bg-gray-700 rounded p-2 shadow">
                <img
                  src={`https://<your-bucket>.s3.ap-south-1.amazonaws.com/story/${story_id}/${scene.image}`}
                  alt={`Scene ${idx + 1}`}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <p className="text-sm">{scene.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StoryVideoMessage;
