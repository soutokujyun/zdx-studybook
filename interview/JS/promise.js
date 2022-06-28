// promise 状态
const PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECTED = "REJECTED";

class basePromise {
    constructor(executor) {
        this.status = PENDING; // 默认状态为PENDING
        this.value = undefined; // 保存成功状态的值，默认为undefined
        this.reason = undefined; // 保存失败状态的值，默认为undefined
        this.onResolvedCallbacks = []; // 保存成功回调
        this.onRejectCallbacks = []; // 保存失败回调

        const resovle = (value) => {
            if (this.status == PENDING) {
                this.status = FULFILLED;
                this.value = value;

                // 依次执行对应函数
                this.onResolvedCallbacks.forEach((fn) => fn());
            }
        };

        const reject = (reason) => {
            if (this.status == PENDING) {
                this.status = REJECTED;
                this.reason = reason;

                this.onRejectCallbacks.forEach((fn) => fn());
            }
        };

        try {
            executor(resovle, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        if (this.status == FULFILLED) {
            onFulfilled(this.value);
        } else if (this.status == REJECTED) {
            onRejected(this.reason);
        } else if (this.status == PENDING) {
            this.onResolvedCallbacks.push(() => {
                onFulfilled(this.value);
            });
            this.onRejectCallbacks.push(() => {
                onRejected(this.reason);
            });
        }
    }
}

module.exports = basePromise;