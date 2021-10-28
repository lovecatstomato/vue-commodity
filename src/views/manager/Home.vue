<template>
    <div>
        <p>欢迎您，{{account}}</p>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState(['account'])
    }
}
</script>

<style lang="less" scoped>

</style>