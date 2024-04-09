<script lang="ts">
    //make props
    export let name: String;
    let firstNameLetter = name[0];
	let firstSurnameLetter = name.split(' ')[1][0];
	let lettersTogether = firstNameLetter + firstSurnameLetter;
</script>

<div class="picture">
    <p>{lettersTogether}</p>
</div>

<style lang="scss" scoped>
    .picture {
            width: 50px;
            height: 50px;
            min-width: 50px;
            min-height: 50px;
            background-color: #F5F5F5;
            border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			p{
				color: #1C1C1C;
				font-weight: 500;
                font-size: 16px;
			}
		}
</style>