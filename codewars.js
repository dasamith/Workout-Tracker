function descendingOrder(num) {
    //...
    //console.log('nee to make this decending', num.sort(function (a, b) { return b - a }))

    var numarray = [];

    var digits = ("" + num).split("");

    var sorted = digits.sort(function (a, b) { return b - a })


    var strAnswer = ''


    for (let i = 0; i < sorted.length; i++) {

        strAnswer += sorted[i]
    }

    console.log('strAnswer ?? ??', parseInt(strAnswer))
    return parseInt(strAnswer)




}

descendingOrder(134245)

//544321