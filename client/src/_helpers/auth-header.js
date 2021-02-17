import { userService } from '@/_services';

export function authHeader() {
    const user = userService.currentUserValue;
    return (user && user.token) ?
        { Authorization: `Bearer ${user.token}` } : {};
}