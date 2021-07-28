import React from 'react';
import {InertiaLink} from '@inertiajs/inertia-react';

export default React.forwardRef(
    function NavLink({href, active, children}, ref) {
        return (
            <InertiaLink
                ref={ref}
                href={href}
            >
                {children}
            </InertiaLink>
        );
    }
)
