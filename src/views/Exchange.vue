<template>
  <div>
    <div class="d-flex justify-content-left">
      <img
        @click="back"
        class="btn-back"
        src="https://www.flaticon.com/svg/vstatic/svg/271/271220.svg?token=exp=1611375789~hmac=42e19d1302b5abce3d0dfdffd8c94cc8"
        alt=""
      />
    </div>
    <label>Moeda</label>
    <div class="d-flex justify-content-center">
      <b-col class="col-md-4">
        <b-form-select
          v-model="selectedCurrency"
          :options="currencyOptions"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></b-form-select>
      </b-col>
    </div>
    <br /><br />
    <div class="d-flex justify-content-center">
      <b-col class="col-md-12">
        <h2 class="current-value">
          Valor atual: {{ currentCurrencyMask }} {{ currentValue[0].value }}
        </h2>
      </b-col>
    </div>
    <br /><br /><br /><br /><br />
    <label>Novo valor</label>
    <div class="d-flex justify-content-center">
      <b-col class="col-md-4">
        <b-form-input
          v-money="money"
          v-model="newValue"
          placeholder="Novo valor"
        ></b-form-input>
      </b-col>
    </div>
    <div class="d-flex justify-content-center btn-container">
      <div class="col-md-4">
        <button
          class="btn-save btn btn-lg btn-primary btn-block text-uppercase"
          @click="save"
        >
          Atualizar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { VMoney } from "v-money";

export default {
  data() {
    return {
      currencies: [
        {
          currency: "USD",
          value: null,
        },
        {
          currency: "BRL",
          value: null,
        },
        {
          currency: "EUR",
          value: null,
        },
        {
          currency: "CAD",
          value: null,
        },
      ],
      newValue: null,
      currencyOptions: ["BRL", "CAD", "EUR"],
      selectedCurrency: "BRL",
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "$",
        suffix: "",
        precision: 2,
        masked: false,
      },
    };
  },
  methods: {
    save() {
      this.$http({
        method: "post",
        url: "https://localhost:5001/api/crypto/btc",
        header: {
          "Access-Control-Allow-Origin": "*",
          Authorization: localStorage.getItem("crypto-auth-token"),
        },
        data: {
          currency: this.selectedCurrency,
          value: this.newValue.replace("$", ""),
        },
      })
        .then((response) => {
          if (response.status == 200) {
            this.$swal({
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1800,
            });

            setTimeout(() => {
              this.back();
            }, 2000);
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
    back() {
      this.$router.push({ name: "home" });
    },
  },
  computed: {
    currentValue() {
      return this.currencies.filter((item) => {
        if (item.currency === this.selectedCurrency) {
          return item;
        }
      });
    },
    currentCurrencyMask() {
      switch (this.selectedCurrency) {
        case "BRL":
          return "R$";
        case "CAD":
          return "C$";
        case "EUR":
          return "€";
        default:
          return "$";
      }
    },
  },
  mounted() {
    this.$http({
      method: "get",
      url: "https://localhost:5001/api/crypto/btc",
      header: {
        "Access-Control-Allow-Origin": "*",
        Authorization: localStorage.getItem("crypto-auth-token"),
      },
    }).then((response) => {
      this.currencies[0].value = response.data?.bpi?.usd.usdRate;
      this.currencies[1].value = response.data?.bpi?.brl.usdRate;
      this.currencies[2].value = response.data?.bpi?.eur.usdRate;
      this.currencies[3].value = response.data?.bpi?.cad.usdRate;
    });
  },
  directives: { money: VMoney },
};
</script>

<style scoped>
.btn-save {
  margin-top: 24px;
}

.btn-back {
  cursor: pointer;
  width: 45px;
  margin-left: 20px;
  margin-top: -30px;
}

label {
  color: ivory;
}

.current-value {
  font-size: 80px;
  color: ivory;
}
</style>