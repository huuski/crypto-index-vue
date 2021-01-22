<template>
    <div>
        <label for="email">Email</label>
        <input placeholder="e-mail" type="email">

        <label for="password">Password</label>
        <input placeholder="password" type="password">

        <button @click="login">Login</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        login() {
            this.$http({
                    method: 'post', 
                    url:'https://localhost:5001/api/login', 
                    header: { 'Access-Control-Allow-Origin': '*' }, 
                    data: { email: this.email, password: this.password }
                }).then(response => {
                    if (response.data?.token) {
                        localStorage.setItem('crypto-auth-token', response.data.token)
                        this.redirect()
                    }
                    else {
                        if (response.data?.message) {
                            console.log('erro')
                        }
                    }
                })
        },
        redirect() {                    
            this.$router.push({name: 'home'})
        }
    }
}
</script>

<style scoped>

</style>