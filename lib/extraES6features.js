class myPop {
  constructor(array) {
    this.array = array;
  }
  myPop() {
    let length = this.array.length;
    let popVal = this.array[length - 1];
    this.array.length = length - 1;
    return popVal;
  }
}

export class myPushAndmyPop  extends myPop {
  constructor(array){
    super(array);
    this.array = array;
  }
  myPush(value) {
    this.array[this.array.length] = value;
    return this.array;
  }
}
