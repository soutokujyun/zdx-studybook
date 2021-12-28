var isSubStructure = function(A, B) {
    return (!!A && !!B) && (recru(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)) 
};

var recru = function(A, B) {
    if (!B) return true
    if (!A && A.val !== B.val) return false
    return recru(A.left, B.left) && recru(A.right, B.right)
}