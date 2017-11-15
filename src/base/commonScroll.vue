<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from "better-scroll"

    export default {
        props: {
            probeType: {
                type: Number,
                default: 1 
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            }
        },
        mounted() {
            setTimeout(() => {
                this._initBscroll();
            }, 20);
        },
        methods: {
            _initBscroll() {
                if (!this.$refs.wrapper) {
                    return;
                }

                this.commonScroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                }); 
            },
            enable() {
                this.commonScroll && this.commonScroll.enable();
            },
            disable() {
                this.commonScroll && this.commonScroll.disable();
            },
            refresh() {
                this.commonScroll && this.commonScroll.refresh();
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh();
                }, 20);
            }
        }    
    }
</script>

<style>

</style>
