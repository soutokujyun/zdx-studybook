let a = 0, b = 0;
function fn(a) {
    fn = function fn2(b) {
        console.log(++a+b)
    }
    console.log(a++)
}

fn(1) // 1
fn(2) // 5