import { useState } from 'react';

import TabButton from './TabButton.jsx';
import Section from './Section.jsx';
import Tabs from './Tabs.jsx';
import { EXAMPLES } from '../data.js';

export default function Examples(){

    // let tabContent = 'Please click a button';
  // 创建状态变量selectedTopic和更新函数setSelectedTopic
  const [ selectedTopic, setSelectedTopic ]= useState();
  // 定义处理选择操作的函数
  function handleSelect(selectedButton) {
    // selectedButton => 'components', 'jsx', 'props', or 'state'
    // console.log(selectedButton);
    // tabContent = selectedButton;
    // 更新selectedTopic状态为选中的按钮标签
    setSelectedTopic(selectedButton);
    // 注意：由于状态更新是异步的，此处可能不会立即显示最新的selectedTopic
    //console.log(selectedTopic);
  }
  // 控制台输出，表明App组件正在执行
//   console.log('App COMPONENT EXECUTING')

  let tabContent = <p>Please select a topic</p>

  if(selectedTopic) {
    tabContent = (
      <div id="tab-content">

              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>
                {EXAMPLES[selectedTopic].code}
                </code>
              </pre>
            </div>
    );
  }

  return(
  
    <Section title="Examples" id="examples">
        <Tabs 
        ButtonsContainer="menu"
        buttons={
        <>
        <TabButton 
              isSelected={selectedTopic === 'components'} 
              onClick={() => handleSelect('components')}
              >
                Components
              </TabButton>
              <TabButton
              isSelected={selectedTopic === 'jsx'}
              onClick={() => handleSelect('jsx')}
              >
                JSX
              </TabButton>
              <TabButton
              isSelected={selectedTopic === 'props'}
              onClick={() => handleSelect('props')}
              >
                Props
              </TabButton>
              <TabButton
              isSelected={selectedTopic === 'state'}
              onClick={() => handleSelect('state')}
              >
                State
              </TabButton>
              </>
            }>
          {tabContent}
          
        </Tabs>
            {/* <h2>Examples</h2> */}
              {/* <TabButton label="Components">Components</TabButton> */}
            {/* {selectedTopic} */}
            {/* {!selectedTopic && <p>Please select a topic.</p>} */}

            {/* {selectedTopic && (
            // <div id="tab-content">

            //   <h3>{EXAMPLES[selectedTopic].title}</h3>
            //   <p>{EXAMPLES[selectedTopic].description}</p>
            //   <pre>
            //     <code>
            //     {EXAMPLES[selectedTopic].code}
            //     </code>
            //   </pre>
            // </div>
            ) } */}
            {/* 如果selectedTopic为true，显示EXAMPLES[selectedTopic]的内容 */}
            {/* 如果selectedTopic为false，什么都不显示 */}

        </Section>
    )
}