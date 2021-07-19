type Matrices = {
  lower_class_limits: number[][],
  variance_combinations: number[][]
}

export class Jenks {

  private data: number[]
  private n_classes: number

  constructor(data: number[], classes: number) {
    this.data = data
    this.n_classes = classes
  }

  private getMatrices(): Matrices {
    let lower_class_limits: number[][] = []
    let variance_combinations: number[][] = []
    let i: number, j: number, variance: number = 0
    // let variance: number = 0
    
    for(i=0; i < this.data.length + 1; i++) {
      let tmp1: number[] = [], tmp2: number[] = []
      for(j=0; j < this.n_classes + 1; j++) {
        tmp1.push(0)
        tmp2.push(0)
      }
      lower_class_limits.push(tmp1)
      variance_combinations.push(tmp2)
    }

    for(i=1; i < this.n_classes + 1; i++ ) {
      lower_class_limits[1][i] = 1
      variance_combinations[1][i] = 0
      for(j=2; j < this.data.length + 1; j++) {
        variance_combinations[j][i] = Infinity
      }
    }

    for(let l = 2; l < this.data.length; l++) {
      let sum: number = 0, sum_squares:number = 0, w: number = 0, i4: number = 0
      for(let m = 1; m < l + 1; m++) {
        let lower_class_limit: number = l - m + 1, val: number = this.data[lower_class_limit - 1]
        w++
        sum += val
        sum_squares += val * val
        variance = sum_squares - (sum * sum) / w
        i4 = lower_class_limit - 1

        if(i4 !== 0) {
          for(j=2; j<this.n_classes + 1; j++) {
            if(variance_combinations[l][j] >= (variance + variance_combinations[i4][j-1])) {
              lower_class_limits[l][j] = lower_class_limit
              variance_combinations[l][j] = variance + variance_combinations[i4][j-1]
            }
          }
        }
      }

      lower_class_limits[l][1] = 1
      variance_combinations[l][1] = variance
    }
    
    return {
      lower_class_limits,
      variance_combinations
    }
  }

  breaks(data: number[], lower_class_limits: number[][], n_classes: number) {
    let k = data.length - 1, kclass: number[] = [], countNum: number = n_classes
    kclass[n_classes] = data[data.length - 1]
    kclass[0] = data[0]

    while(countNum > 1) {
      kclass[countNum - 1] = data[lower_class_limits[k][countNum] - 2]
      k = lower_class_limits[k][countNum] - 1
      countNum--
    }
    return kclass
  }

  natural_breaks() {
    if(this.n_classes > this.data.length) return null
    this.data = this.data.slice().sort((a, b) => a - b)
    let matrices: Matrices = this.getMatrices()
    let lower_class_limits = matrices.lower_class_limits
    return this.breaks(this.data, lower_class_limits, this.n_classes)
  }
}