function radix_sort(arr, n) {
    // n为待排序数组的大小
    let cnt = new Array(65536).fill(0)
    let temp = new Array(n)

    // low 16 bit sort
    for (let i = 0; i < n; i++) cnt[arr[i] & 0xffff] += 1 // cnt
    for (let i = 1; i < 65536; i++) cnt[i] += cnt[i - 1] // 前缀和
    for (let i = n - 1; i >= 0; --i) temp[--cnt[arr[i] & 0xffff]] = arr[i] // 归位
    // init cnt
    for (let i = 0; i < 65536; i++) cnt[i] = 0
    // high 16 bit sort
    for (let i = 0; i < n; i++) cnt[(arr[i] & 0xffff0000) >> 16] += 1 // cnt
    for (let i = 1; i < 65536; i++) cnt[i] += cnt[i - 1] // 前缀和
    for (let i = n - 1; i >= 0; --i) arr[--cnt[(arr[i] & 0xffff0000) >> 16]] = temp[i] // 归位
}