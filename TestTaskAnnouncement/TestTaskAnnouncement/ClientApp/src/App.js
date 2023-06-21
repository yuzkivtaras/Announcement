import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { AnnouncementList } from './components/AnnouncementList';
import SimilarAnnouncements from './components/SimilarAnnouncements';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                    <Route path="/announcement" element={<AnnouncementList />} />
                    <Route path="/announcement/similar" element={<SimilarAnnouncements />} />
                </Routes>
            </Layout>
        );
    }
}
