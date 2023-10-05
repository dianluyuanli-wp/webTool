import React from 'react'
import Stmp from './widgets/stmpToDate'
import Color from './widgets/color'
import Compute from './widgets/compute'
import s from './index.module.scss'

export default function Content() {
    return <div className={s.red}>
        <Stmp />
        <Color />
        <Compute />
    </div>
}