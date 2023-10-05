import React, { useState } from 'react'
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Input, Button, DatePicker, Space } from 'antd'
import s from './index.module.scss'

dayjs.extend(customParseFormat);

export default function Compute() {
    const [content, setCon] = useState('');
    const [res, setRes] = useState('')

    const com = (con: string) => {
        const result = eval(con)
        setRes(result)
      };
    return <div className={s.mar}>
        <Space>
            简易计算
            <Input style={{ width: 400}} onChange={e => setCon(e.target.value)}/>
            <Button onClick={() => com(content)}>run</Button>
            {res}
        </Space>
    </div>
}