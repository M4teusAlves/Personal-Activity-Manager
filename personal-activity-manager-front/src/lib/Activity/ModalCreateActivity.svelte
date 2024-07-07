<script>
    import { X } from "lucide-svelte";
    import { onMount } from "svelte";

    let loadingData = true;
    let errorData = null;
    let categories = [];

    export let show = false;

    let categoryID = "";
    export let userID = "";
    let description = ""

    export let setShow;

    onMount(fetchCategories);


    async function fetchCreateActivity() {
        loadingData = true;

        console.log(userID)

        try {
        const response = await fetch(`http://localhost:3001/activity`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description, userID, categoryID}),
        });

        

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to fetch data');
        }
        } catch (err) {
        errorData = err.message;
        console.log(errorData)
        } finally {
        loadingData = false;
        }
    }

    async function fetchCategories() {
        try {
            const response = await fetch('http://localhost:3001/category', {
                method: "GET",
                headers: {
                'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            categories = await response.json();
        } catch (err) {
            console.log(err)
            categories = [];
        }
    }

</script>
{#if show}
    <div>
        <form on:submit={fetchCreateActivity}>
            <header>
                <h2>Criação de Atividade</h2>
                <button on:click={setShow()}><X/></button>
            </header>
            
            <label for="firstName">
                Descrição:
                <input type="text" bind:value={description} required maxlength="200">
            </label>
            {#if categories.length>0}
                <label for="lastName">
                    Categoria:
                    <select name="" id="" bind:value={categoryID}>
                        {#each categories as item}
                            <option value={item.id}>{item.description}</option>
                        {/each}
                    </select>
                </label>
            {/if}
            
            <input type="submit" value="Criar Atividade">
        </form>
    </div>
{/if}

<style>
    form{
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2rem;
        gap: 2rem;
        height: 25rem;
        width: 25rem;
        position: fixed;
        left: 40%;
        bottom: 25%;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }

    header{
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        width: 100%;
    }

    button{
        background-color: transparent;
        color: rgb(51, 7, 147);
        border-radius: 5px;
        border: 2px rgb(51, 7, 147) solid;
    }

    label{
       
        display: flex;
        flex-direction: column;
    }

    input{
        background-color: transparent;
        width: 15rem;
        height: 2rem;
        border: 2px rgb(51, 7, 147) solid;
    }

    select{
        width: 15rem;
        height: 2rem; 
    }

</style>