import React from 'react';
import styles from "../styles/dashboard.module.css";
import { DashboardLeft, DashboardRight } from '../components';

export default function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <DashboardLeft />
            <DashboardRight />
        </div>
    )
}
