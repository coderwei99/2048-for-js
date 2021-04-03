//    console.log('原来认真的会对一个素未谋面的人思念至极');


window.addEventListener('load', function () {
    //获取分数dom用于后续加分操作
    let score = document.querySelector('.score_num')
    let datas = {
        // 声明data空数组用于存储数据
        data: [],
        //声明游戏开始函数,用于初始化游戏
        star() {
            this == datas
            this.data = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
                this.randernum()
            this.randernum()
            this.getview()
        },
        // 声明声明一个随机函数,用于游戏开始的时候随机生成整数和移动时随机生成数字
        randernum() {
            //声明一个0-3的随机数用于代表行
            while (true) {
                let firstnum = Math.floor(Math.random() * 4)
                //声明一个0-3的随机数用于代表列
                let lastnum = Math.floor(Math.random() * 4)
                // console.log(this.data)
                if (this.data[firstnum][lastnum] == 0) {
                    //0-1的随机数,百分之五十的几率大于0.5,所以可以利用这点来是生成2或者是4的可能率都是百分之五十
                    let viewnum = Math.random() > 0.5 ? 2 : 4
                    this.data[firstnum][lastnum] = viewnum
                    break
                }
            }
        },
        // 视图更新函数
        getview() {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    //获取当前循环数字的div
                    let div = document.getElementById('a' + i + j)
                    // 如果ata数组中当前循环下标的项不为0,则代表有随机数字了,需要更新到视图上让玩家看到
                    if (this.data[i][j] != 0) {
                        div.innerText = this.data[i][j]
                        // 数字更新的时候对应的样式也更新上去
                        div.className = 'index-tr-td n' + this.data[i][j]
                    } else {
                        div.innerText = ''
                        div.className = 'index-tr-td'
                    }
                }

            }
        },

        //游戏移动逻辑方法

        //a.左移动处理函数
        //首先处理每一行的逻辑 
        leftmove() {
            let str1_data = String(this.data)
            for (let i = 0; i < 4; i++) {
                // 拿到每一行的div ：一共四行  
                this.leftGetRows(i)
            }
            let str2_data = String(this.data)
            if (str1_data != str2_data) {
                this.randernum()
            }
            this.getview()
        },

        // 处理每一行div的逻辑
        leftGetRows(x) {
            //
            // 1.拿到每一行里面的小div
            for (let j = 0; j < 3; j++) {
                // 拿到当前这一行内的下一个小div
                let flag = this.leftGetFlag(x, j)
                // 判断有没有数字需要操作，返回-1则代表不需要操作，否则需要操作
                if (flag != -1) {
                    // 首先先判断当前项是否为0，是的话直接将需要操作的数字赋值给当前项并且展示在页面即可，
                    if (this.data[x][j] == 0) {
                        this.data[x][j] = this.data[x][flag]
                        // 需要操作的项赋值给前一项之后将当前项赋值为0
                        this.data[x][flag] = 0
                        j--
                    } else if (this.data[x][j] == this.data[x][flag]) {
                        // 当前项等于需要操作的数字，那么需要进行合并，直接将后一项设置为0，当前项翻倍即可，soeasy
                        this.data[x][j] = this.data[x][j] * 2
                        this.data[x][flag] = 0
                        //调用函数用于判断游戏是否结束
                        this.gameOver()
                        // 调用函数判断是否游戏失败
                        let isOver = this.isGameOver()
                        if (isOver == 1) {
                            console.log(111);
                        }
                    }
                } else {
                    //没有找到直接退出循环
                    break
                }
            }
        },
        leftGetFlag(x, j) {
            for (let r = j + 1; r < 4; r++) {
                if (this.data[x][r] != 0) {
                    //如果当前循环的项不为0 ，说明有数字需要操作，返回他的位置
                    return r
                }
            }
            return -1
        },

        // 右移动处理函数
        rightmove() {
            let str1_data = String(this.data)
            for (let i = 0; i < 4; i++) {
                this.rightGetRows(i)
            }
            let str2_data = String(this.data)
            if (str1_data != str2_data) {
                this.randernum()
            }
            this.getview()
        },
        rightGetRows(x) {
            // console.log(this.data);
            for (let j = 3; j > 0; j--) {
                let flag = this.rightGetFlag(x, j)
                if (flag != -1) {
                    if (this.data[x][j] == 0) {
                        this.data[x][j] = this.data[x][flag]
                        this.data[x][flag] = 0
                        j++
                    } else if (this.data[x][j] == this.data[x][flag]) {
                        this.data[x][j] = this.data[x][j] * 2
                        this.data[x][flag] = 0
                        //调用函数用于判断游戏是否出现2048
                        this.gameOver()
                        // 调用函数判断是否游戏失败
                        let isOver = this.isGameOver()
                        if (isOver == 1) {
                            console.log(111);
                        }
                    }
                } else {
                    break
                }
            }
        },
        rightGetFlag(x, y) {
            for (let r = y - 1; r >= 0; r--) {
                if (this.data[x][r] != 0) {
                    return r
                }
            }
            return -1
        },

        //上移处理函数
        topmove() {
            let str1_data = String(this.data)
            for (let i = 0; i < 4; i++) {
                this.getTopRows(i)
            }
            let str2_data = String(this.data)
            if (str1_data != str2_data) {
                this.randernum()
            }
            this.getview()
        },
        getTopRows(x) {
            for (let j = 0; j < 3; j++) {
                let flag = this.getTopFlag(j, x)
                if (flag != -1) {
                    if (this.data[j][x] == 0) {
                        this.data[j][x] = this.data[flag][x]
                        this.data[flag][x] = 0
                        j--
                    } else if (this.data[j][x] == this.data[flag][x]) {
                        this.data[j][x] = this.data[j][x] * 2
                        this.data[flag][x] = 0
                        //调用函数用于判断游戏是否结束
                        this.gameOver()
                        // 调用函数判断是否游戏失败
                        let isOver = this.isGameOver()
                        if (isOver == 1) {
                            console.log(111);
                        }
                    }
                } else {
                    break
                }
            }
        },
        getTopFlag(x, y) {
            for (let r = x + 1; r < 4; r++) {
                if (this.data[r][y] != 0) {
                    return r
                }
            }
            return -1
        },
        // 下移方法
        downMove() {
            let str1_data = String(this.data)
            for (let i = 0; i < 4; i++) {
                this.getDownRows(i)
            }
            let str2_data = String(this.data)
            if (str1_data != str2_data) {
                this.randernum()
            }
            this.getview()
        },
        getDownRows(x) {
            for (let j = 3; j > 0; j--) {
                let flag = this.getDownFlag(j, x)
                // 这里我们要写视图渲染的逻辑
                if (flag != -1) {
                    if (this.data[j][x] == 0) {
                        this.data[j][x] = this.data[flag][x]
                        this.data[flag][x] = 0
                        j++
                    } else if (this.data[j][x] == this.data[flag][x]) {
                        this.data[j][x] = this.data[j][x] * 2
                        this.data[flag][x] = 0
                        //调用函数用于判断游戏是否结束
                        this.gameOver()
                        // 调用函数判断是否游戏失败
                        let isOver = this.isGameOver()
                        if (isOver == 1) {
                            console.log(111);
                        }
                    }
                }
            }

        },
        getDownFlag(x, y) {
            for (let r = x - 1; r >= 0; r--) {
                if (this.data[r][y] != 0) {
                    return r
                }
            }
            return -1
        },

        //声明方法用于判断是否出现2048，当格子中出现2048的时候就结束游戏
        gameOver() {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (this.data[i][j] == 2048) {
                        alert(111)
                        btn.disabled = false
                        btn.innerText = '开始游戏'
                        btn.style.backgroundColor = 'blue'
                    }
                }
            }
        },

        // 声明方法用于判断是否游戏失败，当格子中都有了数字且无法合并的时候游戏直接结束
        isGameOver() {
            for(var r = 0; r < 4; r++){
                for(var c = 0; c < 4; c++){
                    if(this.data[r][c] == 0){  //里面有空格子的时候，游戏还是可以运行
                        return -1  //表示游戏还没有结束
                    }
                    if(c < 3){//判断左右是否有相同的
                        if(this.data[r][c] == this.data[r][c+1]){
                            return -1
                        }
                    }
                    if(r < 3){
                        if(this.data[r][c] == this.data[r+1][c]){
                            return -1
                        }
                    }
                }
            }
            return 1;
        }


    }
    let btn = document.querySelector('button')
    btn.addEventListener('click', function () {
        // 点击按钮调用开始开始初始化游戏
        datas.star()
        // 游戏开始后使按钮无法点击
        btn.disabled = true
        btn.innerText = 'Let go'
        btn.style.backgroundColor = 'gray'
        // datas.randernum()
        // 游戏初始化有监听键盘按下事件  这个函数可以放在游戏初始化函数内部
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 37:
                    datas.leftmove()
                    break;
                case 38:
                    datas.topmove()
                    break;
                case 39:
                    datas.rightmove()
                    break;
                case 40:
                    datas.downMove()
                    break;
            }
        })
    })
})