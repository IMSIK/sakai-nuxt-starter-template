<template>
  <div class="Evaluator">
    <h2>Evaluator</h2>
    <div class="Evalutater">
      <div class="Header">
        <form class="Info">
          <InputGroup>
            <InputGroupAddon>
              <i
                class="pi pi-hashtag"
              />
            </InputGroupAddon>
            <InputText
              v-model="code"
              placeholder="Code"
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-tag" />
            </InputGroupAddon>
            <InputText
              v-model="Name"
              placeholder="Stock Name"
            />
          </InputGroup>
        </form>
        <div class="Result">
          Total Score: {{ total }}
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-6 w-1/6" />
  </div>
</template>

<script>
export default {
  name: 'Evaluater',
  // props: {
  components: {
    // SelectButton,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      name: '',
      code: '',
      selectButtonValues: ['not pass', '9 years', '10 years'],
      score_board: [
        {
          name: 'ROE > 12%',
          options: ['not pass', '8 years', '9 years', '10 years'],
          selected: '',
          get_score: 0,
          other_info: '',
        },
        {
          name: 'EPS > 12%',
          options: ['not pass', '9 years', '10 years'],
          selected: '',
          get_score: 0,
          other_info: '',
        },
        {
          name: 'CFO, CFI, CFF (+-+)',
          options: ['not pass', '8 years', '9 years', '10 years'],
          selected: '',
          get_score: 0,
          other_info: '',
        },
        {
          name: 'CFI (-)',
          options: ['not pass', '8 years', '9 years', '10 years'],
          selected: '',
          get_score: 0,
          other_info: '',
        },
        {
          name: 'CFI (-) bonus 某年事故',
          options: [
            'has one within 10 years',
            'not once within 10 years',
            'not once within 20 years',
          ],
          selected: '',
          get_score: 0,
          other_info: '',
        },
        {
          name: 'Gross Margin 毛利率 % ',
          options: [
            'not pass',
            '3 years - 5 years (in average)',
            '5 years - 10 years (in average)',
            'more than 10 years (in average)',
          ],
          selected: '',
          get_score: 0,
          other_info: '',
        },
        {
          name: 'Operating Margin 經營利潤率 %',
          options: [
            'not pass',
            '3 years - 5 years (in average)',
            '5 years - 10 years (in average)',
            'more than 10 years (in average)',
          ],
          selected: '',
          get_score: 0,
          other_info: '',
        },
        {
          name: 'ROE Dupont (淨利率)',
          options: [
            'not pass',
            '3 years - 5 years (in average)',
            '5 years - 10 years (in average)',
            'more than 10 years (in average)',
          ],
          selected: '',
          get_score: 0,
          other_info: 'net profit/sales',
        },
        {
          name: 'ROE Dupont (總資產周轉率)',
          options: [
            'not pass',
            '3 years - 5 years (in average)',
            '5 years - 10 years (in average)',
            'more than 10 years (in average)',
          ],
          selected: '',
          get_score: 0,
          other_info: 'sales/total asset',
        },
        {
          name: 'ROE Dupont (權益乘數)',
          options: [
            'not pass',
            '3 years - 5 years (in average)',
            '5 years - 10 years (in average)',
            'more than 10 years (in average)',
          ],
          selected: '',
          get_score: 0,
          other_info: 'total asset/owner equity)',
        },
        {
          name: 'ROE Dupont (流動比率)',
          options: ['not pass', '10年 >100% '],
          selected: '',
          get_score: 0,
          other_info: '',
        },
        {
          name: 'ROE Dupont (流動比率) bonus',
          options: [
            'not pass',
            '3 years - 5 years (in average)',
            '5 years - 10 years (in average)',
            'more than 10 years (in average)',
          ],
          selected: '',
          get_score: 0,
          other_info: '',
        },
        {
          name: 'ROE Dupont (負債比率)',
          options: ['not pass', '10年 < 50% '],
          selected: '',
          get_score: 0,
          other_info: '',
        },
        {
          name: 'ROE Dupont (負債比率) bonus',
          options: [
            'not pass',
            '3 years - 5 years (in average)',
            '5 years - 10 years (in average)',
            'more than 10 years (in average)',
          ],
          selected: '',
          get_score: 0,
          other_info: '',
        },
        {
          name: '實收比 > 1',
          options: ['not pass', '8 years', '9 years', '10 years'],
          selected: '',
          get_score: 0,
          other_info: 'CFO/Net Income',
        },
        {
          name: 'FCF > 0',
          options: ['not pass', '8 years', '9 years', '10 years'],
          selected: '',
          get_score: 0,
          other_info: '',
        },
        {
          name: '自由現金矩陣(P+-+)',
          options: ['not pass', '6-7 years', '8-9 years', '10 years'],
          selected: '',
          get_score: 0,
          other_info: '',
        },
      ],
      new_stock: {
        code: '',
        score: 0,
        type: null,
        update_date: '',
        data: {},
      },
      total: 0,
    }
  },
  watch: {
    score_board: {
      handler() {
        this.calculate_total()
        // console.log(this.score_board)
      },
      immediate: false,
      deep: true,
    },
  },
  mounted() {
    this.score_board.forEach((row) => {
      row.selected = row.options[0]
      row.get_score = row.options.indexOf(row.selected)
    })
  },
  methods: {
    get_score(row) {
      return row.get_score
    },
    set_score(row, options, value) {
      const score = options.indexOf(value)
      row.get_score = score
      console.log(score, value)
    },
    calculate_total() {
      this.total = 0
      this.score_board.forEach((options) => {
        // console.log(options.get_score);
        this.total += options.get_score
      })
      console.log('total score ', this.total)
    },
  },
}
</script>

<style lang="scss" scoped>
.Evalutater {
  position: relative;
  margin: 0 auto;
  height: 1400px;
  .Header {
    display: flex;
    align-items: center;
    gap: 40px;
  }
  .Info {
    display: table;
    left: 0px;
  }
  .Result {
    font-weight: bolder;
    margin: auto 0 auto;
    align-self: center;
    font-size: 30px !important;
  }
  .Form {
    display: flex;
    flex-wrap: wrap;
    .Options {
      width: 460px !important;
      height: 100px !important;
      margin: 5px;
      // color: white;
      font-size: 10px !important;
      .title {
        width: 460px !important;
        height: 20px !important;
        display: inline-flex;
        .label {
          width: 200px !important;
          height: 20px !important;
          font-weight: bolder;
          font-size: 15px !important;
        }
      }
      .selectbtn {
        height: 80px;
        display: flex;
      }
    }
  }
  .Save-btn {
    color: black;
    // font-weight: bolder;
    margin: auto 10px auto;
    // font-size: 30px !important;
  }
}
</style>
