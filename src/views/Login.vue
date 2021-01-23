<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <div class="logo-container">
              <span class="logo-title">CRYPTO-INDEX</span>
              <img
                class="logo-img"
                src="https://www.flaticon.com/svg/vstatic/svg/25/25180.svg?token=exp=1611348439~hmac=159b8715dc04b34cfe3bf75c126caca9"
                alt=""
              />
            </div>
            <form class="form-signin">
              <div class="form-label-group">
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  placeholder="E-mail"
                  required
                  autofocus
                />
              </div>
              <div class="form-label-group">
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="Senha"
                  required
                />
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck1"
                />
              </div>
              <button
                class="btn btn-lg btn-primary btn-block text-uppercase"
                @click="login"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    login() {
      event.preventDefault();
      console.log("login");
      this.$http({
        method: "post",
        url: "https://localhost:5001/api/login",
        header: { "Access-Control-Allow-Origin": "*" },
        data: { email: this.email, password: this.password },
      })
        .then((response) => {
          if (response.status == 200) {
            localStorage.setItem("crypto-auth-token", response.data?.token);
            this.redirect();
          }
        })
        .catch((error) => {
          this.$swal({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    redirect() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
body {
  background: linear-gradient(
    to right,
    #373b44,
    #4286f4
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  border-radius: 2rem;
  height: 40px;
}

.form-label-group > input,
.form-label-group > label {
  padding: 25px;
}

.logo-container {
  margin: 24px;
}

.logo-img {
  margin-top: -16px;
  width: 20%;
}

.logo-title {
  font-size: 2em;
}
</style>