// 导出默认函数组件 Log
export default function Log({turns}) {
    // 使用 JSX 返回一个有序列表
    return <ol id="log">
        {
            // 对传入的 turns 数组进行遍历，每个元素代表一个回合
            turns.map((turn) => (
                // 为每个列表项创建一个 <li> 元素
                // key 用于 React 的元素识别，通常是一个唯一的字符串
                <li key={`${turn.square.row}${turn.square.col}`}>
                    {/* // 显示每个回合的玩家和他们选择的行列 */}
                    {turn.player} selected {turn.square.row}, {turn.square.col}
                </li>
            ))
        }
    </ol>
}
