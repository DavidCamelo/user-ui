import React from 'react';
import { ResourcePage } from 'components_ui/ResourcePage';
import { userService } from 'components_ui/api';

export const UsersPage = () => {
    const userConfig = {
        title: 'User Management',
        resourceName: 'User',
        service: userService,
        columns: [
            { key: 'id', header: 'ID' },
            { key: 'name', header: 'Name' },
            { key: 'lastName', header: 'Last Name' },
        ],
        formFields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'lastName', label: 'Last Name', type: 'text' },
        ],
    };

    return <ResourcePage {...userConfig} />;
};
