import React from 'react';
import { Navigate } from 'react-router-dom';

export function PublicRoute(props) {
	if (localStorage.getItem('token')) {
		return props.children;
	} else {
		return <Navigate to="/dashboard" />;
	}
}