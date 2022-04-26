export default async function ({ $auth, redirect }) {
    if (process.server) {
        try {

            const role = await $auth.user.role
            console.log(role)
            if (role && (role === 1)) {
                return redirect('/admin');
            }
            else if (role === 0) {
                return redirect('/');

            } else {
                return redirect('/login');
            }

        } catch (error) {
            console.log(error)
        }
    }

}
