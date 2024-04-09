<script lang="ts">
import RegisterForm from "../../components/registerForm.svelte";
</script>

<div class="register">
    <div class="c1">

    </div>
    <div class="c2">
        <RegisterForm />
    </div>
</div>

<style lang="scss" scoped>
    $register-width: 650px;
    .register{
        width: 100%;
        height: 100vh;
        display: flex;
        .c1{
            width: calc(100% - $register-width);
            height: 100%;
            background-color: #121212;
            border-right: solid 1px #2F2F2F;
        }
        .c2{
            width: $register-width;
            height: 100%;
            display: flex;
            justify-content: center;
        }
    }
</style>