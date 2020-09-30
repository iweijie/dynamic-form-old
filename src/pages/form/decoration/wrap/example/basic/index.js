import React, { useState, useEffect } from 'react';
import Case from '../Case';
import Input from './Input';

let timer;

export default () => {
    const [test, setTest] = useState('111');

    useEffect(() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setTest(
                Math.random()
                    .toString()
                    .slice(3),
            );
        }, 3000);
    }, [setTest]);

    return (
        <div>
            {/* <Case title="普通 input">
        <Input />
      </Case> */}

            {/* <Case title="有 listener "> */}
            <Case
                title="普通"
                description="绑定了 listener，输入就会有 console.log 当前输入的值"
            >
                <Input
                    value={test}
                    onChange={({ state }) => console.log(state.value)}
                />
            </Case>

            {/* <Case
          title="preventDefault"
          description="阻止了默认 listener，虽然会有 console.log ，但不会改变值"
        >
          <Input onChange={[({ state }) => console.log(state.value), true]} />
        </Case>

        <Case
          title="only preventDefault"
          description="阻止了默认 listener，输入不会有变化"
        >
          <Input onChange={[undefined, true]} />
        </Case>

        <Case
          title="before default"
          description="绑定了一个 listener 在默认 listener 前执行， console.log 出来的是改变前的值"
        >
          <Input
            onChange={[({ state }) => console.log(state.value), false, true]}
          />
        </Case>

        <Case
          title="prevent default on the fly"
          description="根据绑定 listener 动态决定要不要执行默认 listener。输入3就不会改变"
        >
          <Input
            onChange={[
              (_, e) => {
                console.log(_);
                return e.target.value === '3' ? [undefined, true] : undefined;
              },
              false,
              true,
            ]}
          />
        </Case>
      </Case>

      <Case
        title="identifier"
        description="使用了 Input 组件的 Prefix identifier"
      >
        <Input>
          <Input.Prefix>
            <span>姓名: </span>
          </Input.Prefix>
        </Input>
      </Case> */}
        </div>
    );
};
