// src/components/task/TaskStageSelectBox.jsx

import React from 'react';
import SelectBox from 'devextreme-react/select-box';

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];

const TaskStageSelectBox = ({ stage, setStage }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">Task Stage</label>
      <SelectBox
        dataSource={LISTS}
        value={stage}
        onValueChanged={(e) => setStage(e.value)}
        placeholder="Select Task Stage"
        showClearButton={true}
        searchEnabled={true}
        className="w-full rounded border-gray-300"
      />
    </div>
  );
};

export default TaskStageSelectBox;
