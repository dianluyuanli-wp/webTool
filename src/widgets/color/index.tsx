import React, { useState } from 'react'
import { Input, Button, Space } from 'antd'
import s from './index.module.scss'

export default function Color() {
    const [content, setContent] = useState('255,165,1')
    const [hex, setHex] = useState('')

    const [content2, setContent2] = useState('')
    const [rgb, setRgb] = useState('')
    const RGBToHex = (r:number, g:number, b:number) =>
    ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

    function rgbPre(str:string) {
        let arr = str.split(',').map(item => parseInt(item));
        console.log(str, arr)
        return RGBToHex(arr[0], arr[1], arr[2])
    }

    function hexToRGB(hex: string) {
        var hexx = hex.replace('#', '0x') as any;
        var r = hexx >> 16;
        var g = hexx >> 8 & 0xff;
        var b = hexx & 0xff;
        return `rgb(${r}, ${g}, ${b})`;
    }
    return <div className={s.mar}>
        <Space>
            rgb转hex
            <Input value={content} style={{width: 200}} onChange={e => setContent(e.target.value)}/>
            <Button onClick={() =>setHex(rgbPre(content))}>run</Button>
            {hex ? `#${hex}` : ''}
            <div className={s.block} style={{ background: '#' + hex }}/>
        </Space>
        <div className={s.mar}>
        <Space>
            hex转rgb
            <Input defaultValue={'#ffffff'} style={{width: 200}} onChange={e => setContent2(e.target.value)}/>
            <Button onClick={() =>setRgb(hexToRGB(content2))}>run</Button>
            {rgb}
            <div className={s.block} style={{ background: rgb }}/>
        </Space>
        </div>
    </div>
}