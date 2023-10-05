import React, { useState } from 'react'
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { InputNumber, Button, DatePicker, Space } from 'antd'
import s from './index.module.scss'

dayjs.extend(customParseFormat);

export default function StmpToDate() {
    const [num, setNum] = useState(0);
    const [res, setRes] = useState('')
    const [stmp, setStmp] = useState(0)
    function getRes() {
        setRes(new Date(num).toISOString())
    }
    function addZero(e: number) {
        if(('' + e).length === 10) {
            return e * 1000
        }
        return e
    }
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        const numStm = date?.valueOf() || 0
        setStmp(numStm - numStm % 1000)
      };
    return <div>
        {/* <DatePicker onChange={onChange} /> */}
        <Space>
            时间戳转日期
            <InputNumber style={{ width: 200}} value={num} onChange={e => setNum(addZero(e as number))}/>
            <Button onClick={getRes}>run</Button>
            {res}
        </Space>
        <div className={s.mar}>
            <Space>
                日期转时间戳
                <DatePicker
                    onChange={onChange}
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                />
                {stmp}
            </Space>
        </div>
    </div>
}