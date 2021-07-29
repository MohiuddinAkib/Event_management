import React, {useState} from 'react';
import styled from 'styled-components';
import Dropdown from '@/Components/Dropdown';
import BookIcon from '@material-ui/icons/Book';
import EventIcon from '@material-ui/icons/Event';
import {InertiaLink} from '@inertiajs/inertia-react';
import {createMuiTheme} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import {StylesProvider} from '@material-ui/core/styles'
import ApplicationLogo from '@/Components/ApplicationLogo';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Toolbar, List, ListItem, ListItemIcon, ListItemText, Container} from '@material-ui/core';
import Layout, {
    Root,
    getFooter,
    getHeader,
    getContent,
    getSubheader,
    getDrawerSidebar,
    getSidebarContent,
    getSidebarTrigger,
} from '@mui-treasury/layout';

const Header = getHeader(styled);
const Footer = getFooter(styled);
const Content = getContent(styled);
const Subheader = getSubheader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const SidebarContent = getSidebarContent(styled);

const scheme = Layout();

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'ui-sans-serif',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            '"Noto Sans"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#e74c3c',
        },
        secondary: {
            main: '#fffaf2',
        },
    },
    overrides: {
        MuiListItem: {
            root: {
                '&.Mui-selected': {
                    backgroundColor: '#7d4709',
                    color: '#fff',
                    '& svg': {
                        color: '#fff',
                    },
                    '&:hover': {
                        backgroundColor: '#95550b',
                    },
                },
            },
        },
        MuiListItemIcon: {
            root: {
                minWidth: 48,
            },
        },
    },
});

scheme.configureHeader(builder => {
    builder
        .registerConfig('xs', {
            position: 'sticky',
        })
        .registerConfig('md', {
            clipped: true,
            position: 'relative', // won't stick to top when scroll down
        });
});

scheme.configureSubheader(builder => {
    builder.create('subheader', {})
        .registerConfig('xs', {
            layer: 1,
            clipped: true,
            position: 'relative',
        })
});

scheme.configureEdgeSidebar(builder => {
    builder
        .create('unique_id', {anchor: 'left'})
        .registerTemporaryConfig('xs', {
            width: 'auto', // 'auto' is only valid for temporary variant
        })
        .registerPersistentConfig('md', {
            width: 256, // px, (%, rem, em is compatible)
            autoExpanded: true,
            collapsedWidth: 0,
            collapsible: true,
            persistentBehavior: {
                header: "none",
                content: "fit",
                footer: "fit"
            },
            headerMagnetEnabled: true
        });
    ;
});

export default function Authenticated({auth, header, children}) {
    return (
        <StylesProvider injectFirst>
            <Root scheme={scheme} theme={theme}>
                <CssBaseline/>
                <Header className="bg-white border-b border-gray-100">
                    <Toolbar>
                        <div className={"flex-1"}>
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="flex-shrink-0 flex items-center">
                                        <InertiaLink href="/">
                                            <ApplicationLogo className="block h-9 w-auto text-gray-500"/>
                                        </InertiaLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SidebarTrigger sidebarId="unique_id"/>
                    </Toolbar>
                </Header>

                {header && (
                    <Subheader subheaderId={"subheader"} className={"bg-white shadow"}>
                        <Toolbar>
                            <div className={"flex-1"}>{header}</div>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={window.route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </Toolbar>
                    </Subheader>
                )}

                <DrawerSidebar sidebarId={'unique_id'}>
                    <SidebarContent>
                        <List>
                            <ListItem button component={InertiaLink} href={window.route("reservations.create")}>
                                <ListItemIcon>
                                    <EventIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Meeting Calendar"/>
                            </ListItem>

                            <ListItem button component={InertiaLink} href={window.route("reservations.index")}>
                                <ListItemIcon>
                                    <BookIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Room Booking"/>
                            </ListItem>

                            <ListItem button component={InertiaLink} href={window.route("user_management.index")}>
                                <ListItemIcon>
                                    <AccountCircleIcon/>
                                </ListItemIcon>
                                <ListItemText primary="User Management"/>
                            </ListItem>
                        </List>
                    </SidebarContent>
                </DrawerSidebar>

                <Content className="min-h-screen bg-gray-100">
                    {children}
                </Content>

                <Footer>
                    <Toolbar>
                        Apex inc
                    </Toolbar>
                </Footer>
            </Root>
        </StylesProvider>
    );
}
