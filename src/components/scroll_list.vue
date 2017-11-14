<template>
    <div class="wrapper" ref="wrapper">
        <ul class="content">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
            <li>11</li>
            <li>12</li>
            <li>13</li>
            <li>14</li>
            <li>15</li>
            <li>16</li>
            <li>17</li>
            <li>18</li>
            <li>19</li>
            <li>20</li>
        </ul>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        mounted() {
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click: true,
                    momentum: true
                })
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "./../common/sass/var.scss";
    //better-scroll的目标容器wrapper必须是固定高度才能滚动,所以给.wrapper加了定位 
    .wrapper {
        position: absolute;
        width: $percent;
        height: $percent;
        .content {
            background-color: $conBgColor;
            li {
                width: $percent;
                height: 40px;
                line-height: 40px;
                // background-color: #ccc;
                color: #fff;
                padding: 0 0 0 10px;
                border-bottom: 1px solid #000;
                box-sizing: border-box;
            }
        }
    }
</style>

