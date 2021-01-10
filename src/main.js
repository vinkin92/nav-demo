let sitelist = $('.sitelist');
let $lastLi = sitelist.find('.last');
let siteName = $('.alert .siteName')
let siteURL = $('.alert .siteURL')
let data = localStorage.getItem('nav');
let objData = JSON.parse(data)
var pattern = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
let logo
let hashMap = objData || [
    { logo: 'https://xiedaimala.com/favicon.ico', name: '写代码啦', url: 'https://xiedaimala.com/', sort: '', number: 1 },
    { logo: 'https://www.baidu.com/favicon.ico', name: '爱奇艺', url: 'https://www.baidu.com/', sort: '', number: 2 },
    { logo: 'https://www.bilibili.com/favicon.ico', name: '哔哩哔哩', url: 'https://www.bilibili.com', sort: '', number: 3 },
    { logo: 'https://www.vip.com/favicon.ico', name: '唯品会', url: 'https://www.vip.com/', sort: '', number: 4 },
    { logo: 'https://fz.58.com/favicon.ico', name: '58同城', url: 'https://fz.58.com/', sort: '', number: 5 },
    { logo: 'https://www.zhihu.com/favicon.ico', name: '知乎', url: 'https://www.zhihu.com/', sort: '', number: 6 }
]

// 初始化页面网址
let render = () => {
    // 查找sitelist里面所有元素，.last除外
    sitelist.find('li:not(.last').remove()
    hashMap.forEach((node) => {
        let $li = template(node).insertBefore($lastLi)
        clickEvent($li, node)
    })
}



// 给元素注册点击事件
let clickEvent = ($li, node) => {
    $li.on('click', () => {
        window.open(node.url)
    })

    $li.on('click', '.close', (e) => {
        e.stopPropagation()
        console.log('1')
        console.log($li.remove())
            // hashMap.splice(index, 1)

    })
    $li.on('click', '.edit', function(e) {
        e.stopPropagation();
        $('.alert').removeClass('hidden');
        let state = $(this).attr("data-index")
        if (siteName.val() === '' || siteURL.val() === '') {
            siteName.attr('value', node.name)
            siteURL.attr('value', node.url)
        }
        $('.confirm').attr('data-state', state)
    })
    let time
        //let time
    $li.on('touchstart', (e) => {
        e.stopPropagation();
        time = setTimeout(function() {
            $('.alert').removeClass('hidden');
            $('.siteName').focus().select()
            let state = $(this).attr("data-index")
            if (siteName.val() === '' || siteURL.val() === '') {
                siteName.attr('value', node.name)
                siteURL.attr('value', node.url)
            }
            $('.confirm').attr('data-state', state)
        }, 1000)
    })
    $li.mouseup((e) => {
        e.stopPropagation();
        clearTimeout(time)
    })

}

// 模板
let template = (node) => {
    return $(`
    <li data-index=${node.number}>
        <div class="site">
            <div class="logo"><img src="${node.logo}" onerror="this.src='./img/未找到图片.jpg';this.onerror=null"></div>
            <div class="text">${node.name}</div>
            <div class="close" >
                <svg class="icon">
                    <use xlink:href="#icon-Close"></use>
                </svg>
            </div>
            <div class="edit" data-index="${node.number}">
                <svg class="icon">
                    <use xlink:href="#icon-edit" data-index='${node.number}'></use>
                </svg>
            </div>
        </div>
    </li>
    `)
}
let add = (data) => {
    if (!data) {

    } else {
        console.log('1111')
        let $li = template(hashMap[hashMap.length - 1]).insertBefore($lastLi)
        clickEvent($li, hashMap[hashMap.length - 1])

    }
}


render()

// ------------- 点击添加按钮 ----------------
$('.addButton').on('click', () => {
    $('.alert').removeClass('hidden')
    $('.siteName').focus()
})

// ------------- 点击取消按钮 -------------
$('.cancel').on('click', () => {
        $('.alert input').val('');
        $(this).attr("data-state", '0')
        $('.alert').addClass('hidden')
    })
    // ------------- 点击完成按钮 -------------
$('.confirm').on('click', function() {
        let siteName = $('.siteName').val();
        let siteURL = $('.siteURL').val();
        let state = $(this).attr("data-state")
        if (!siteURL) {
            $('.siteURL').focus();
            alert('网址不能为空');
            return false;
        } else if (siteURL.indexOf('http' !== 0)) {
            siteURL = 'https://' + siteURL;
            if (!pattern.test(siteURL)) {
                alert('请输入正确的网址');
                return false;
            }
        } else if (!pattern.test(siteURL)) {
            alert('请输入正确的网址');
            return false;
        }
        let urlReg = /^http(s)?:\/\/(.*?)\//;

        if (siteURL.charAt(siteURL.length - 1) !== '/') {
            siteURL += '/';
            logo = urlReg.exec(siteURL)[0] + 'favicon.ico'
        }
        if (!siteName) {
            siteName = urlReg.exec(siteURL)[2]
            console.log(siteName);
        }
        if (state == 0) {
            hashMap.push({
                logo: logo,
                name: siteName,
                url: siteURL,
                sort: '',
                number: hashMap[hashMap.length - 1].number + 1
            })
            add('true')
        } else {
            console.log('111')
            hashMap.forEach((element, i) => {
                console.log(i + ":" + hashMap[i].number + 'state:' + state)
                if (hashMap[i].number == state) {
                    console.log(hashMap[i])
                    hashMap[i].logo = logo;
                    hashMap[i].name = siteName;
                    hashMap[i].url = siteURL;
                    hashMap[i].sort = '';
                    let $li = template(hashMap[i])
                    clickEvent($li, hashMap[i])
                    $(`li[data-index=${state}]`).replaceWith($li)
                        // <li data-index=${node.number}>/
                    console.log(hashMap)
                    return
                }
            })
        }
        $(this).attr("data-state", '0')
        $('.alert').addClass('hidden');
        $('.alert input').val('');
    })
    // ------------- 点击分类1 -------------
$('.sort1').on('click', () => {
        alert('该功能未开放')
    })
    // ------------- 点击分类2 -------------
$('.sort2').on('click', () => {
        alert('该功能未开放')
    })
    //---存数据到本地
window.onbeforeunload = () => {
    let str = JSON.stringify(hashMap)
    localStorage.setItem('nav', str)
}