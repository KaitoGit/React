import { useState } from "react";

// Player 组件，接收 initialName, symbol 和 isActive 作为 props
export default function Player({ 
    initialName, 
    symbol, 
    isActive, 
    onChangeName
}) {
    // 使用 useState 创建并管理 playerName 和 isEditing 状态
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    //Add a function that's triggered when the edit button is clicked.
    //Change the isEditing state to true when the edit button is clicked.
    //Show the <span className="player-name"> only if isEditing is false.
    //Show an <input> element only if isEditing is true.

    // 处理编辑按钮的点击事件
    function handleEditClick() {
        setIsEditing((editing) => !editing);

        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    // 处理输入框内容的变化
    function handleChange(event) {
        console.log(event);
        setPlayerName(event.target.value);
    }

    
    // 根据 isEditing 状态，决定显示的是文本还是输入框
    let editablePlayerName = (
        <span className="player-name">{playerName}</span>
    );
    // let btnCaption = "Edit";

    if (isEditing) {
        editablePlayerName = (
            <input
                type="text"
                required 
                value={playerName}
                onChange={handleChange}
            />
        );
        // btnCaption="Save";
    }
    
    // 渲染玩家 UI
    return (
        <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
      );
    }