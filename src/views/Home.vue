<template>
  <div>
    <Loader v-if="!isLoading" />
    <div v-else>
      <div class="d-flex justify-content-center btn-container">
        <button
          class="currency-btn btn btn-lg btn-primary btn-block text-uppercase"
          @click="update"
        >
          Alterar valor monetário
        </button>
      </div>
      <div class="d-flex justify-content-center">
        <img
          class="img-btc"
          src="https://www.flaticon.com/svg/vstatic/svg/25/25180.svg?token=exp=1611368591~hmac=c31b3355aac09e1630a650e513a2e178"
          alt=""
        />
      </div>
      <br />
      <div class="d-flex justify-content-center">
        <div class="col-md-3">
          <b-form-spinbutton
            @change="getCurrency"
            v-model="btcAmount"
            min="1"
            max="100"
          ></b-form-spinbutton>
        </div>
      </div>
      <br /><br />
      <div class="d-flex justify-content-center">
        <div
          v-for="currency in currencies"
          :key="currency.name"
          class="col-md-3"
        >
          <div class="currency-card">
            <div>
              <img
                class="currency-card__flag"
                :src="currency.flag"
                :alt="currency.name"
              />
            </div>
            <div class="currency-card__description">
              {{ currency.description }}
            </div>
            <div class="currency-card__name">{{ currency.name }}</div>
            <div>
              <div class="currency-card__value">{{ currency.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loader } from "../components/Loader";

export default {
  components: {
    loader,
  },
  data() {
    return {
      isLoading: true,
      token: null,
      btcAmount: 1,
      currencies: [
        {
          name: "USD",
          description: "United States Dollar",
          flag:
            "https://www.flaticon.com/svg/vstatic/svg/197/197484.svg?token=exp=1611350419~hmac=eaeeeeb1042137e64ce31f222567ca01",
          value: "",
        },
        {
          name: "BRL",
          description: "Brazilian Real",
          flag:
            "https://www.flaticon.com/svg/vstatic/svg/197/197386.svg?token=exp=1611350402~hmac=9255b869aa8fa5a4947f2e7b2a2e8bfe",
          value: "",
        },
        {
          name: "EUR",
          description: "Euro",
          flag:
            "https://www.flaticon.com/svg/vstatic/svg/197/197615.svg?token=exp=1611350440~hmac=2bda947cf79e367efd2585a2aa911c6a",
          value: "",
        },
        {
          name: "CAD",
          description: "Canadian Dollar",
          flag:
            "https://www.flaticon.com/svg/vstatic/svg/197/197430.svg?token=exp=1611350395~hmac=886973595cbaeb6b94ed4ad36165a33d",
          value: "",
        },
      ],
    };
  },
  methods: {
    update() {
      this.$router.push({ name: "exchange" });
    },
    getCurrency() {
      this.$http({
        method: "get",
        url: `https://localhost:5001/api/crypto/btc?quantity=${this.btcAmount}`,
        header: {
          "Access-Control-Allow-Origin": "*",
          Authorization: localStorage.getItem("crypto-auth-token"),
        },
      }).then((response) => {
        this.currencies[0].value = response.data?.bpi?.usd.rate;
        this.currencies[1].value = response.data?.bpi?.brl.rate;
        this.currencies[2].value = response.data?.bpi?.eur.rate;
        this.currencies[3].value = response.data?.bpi?.cad.rate;
      });
    },
  },
  mounted() {
    this.$http({
      method: "get",
      url: `https://localhost:5001/api/crypto/btc?quantity=${this.btcAmount}`,
      header: {
        "Access-Control-Allow-Origin": "*",
        Authorization: localStorage.getItem("crypto-auth-token"),
      },
    }).then((response) => {
      this.currencies[0].value = response.data?.bpi?.usd.rate;
      this.currencies[1].value = response.data?.bpi?.brl.rate;
      this.currencies[2].value = response.data?.bpi?.eur.rate;
      this.currencies[3].value = response.data?.bpi?.cad.rate;
    });
  },
};
</script>

<style scoped>
.currency-card {
  background: white;
  width: 250px;
  display: inline-block;
  margin: 0 auto;
  border-radius: 19px;
  position: relative;
  text-align: center;
  box-shadow: -1px 15px 30px -12px black;
  z-index: 9999;
}

.currency-card__description {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 3px;
}

.currency-card__name {
  font-size: 26px;
  color: black;
  font-weight: 900;
  margin-bottom: 5px;
}

.currency-card__flag {
  width: 60%;
  padding: 24px;
}

.currency-card__value {
  color: green;
  font-size: 36px;
  font-weight: 900;
}

.btn-container {
  margin-bottom: 48px;
}

.currency-btn {
  width: 30%;
}

.img-btc {
  width: 7%;
  margin-top: -16px;
}

.loader {
  margin: 16px;
}
</style>