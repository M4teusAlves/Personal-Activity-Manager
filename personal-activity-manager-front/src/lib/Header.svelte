<script>
    import { PencilIcon, PlusIcon, TrashIcon } from "lucide-svelte";
    import { onMount } from "svelte";
    import ModalCreateCategory from "./Category/ModalCreateCategory.svelte";
    import ModalUpdateCategory from "./Category/ModalUpdateCategory.svelte";

    let data = [];
    let category = "";
    let loadingData = true;
    let loadingUsers = true;
    let errorData = null;
    let errorUsers = null;
    let showModalCreate = false;
    let showModalUpdate = false;

    onMount(fetchCategories);

    function refreshPage() {
        location.reload();
    }


    async function fetchCategories() {
        loadingUsers = true;
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
            data = await response.json();
        } catch (err) {
            errorUsers = err.message;
            data = [];
        } finally {
            loadingUsers = false;
        }
    }

    async function fetchDeleteCategory() {
        loadingUsers = true;
        try {
            const response = await fetch(`http://localhost:3001/category/${category}`, {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
        } catch (err) {
            errorUsers = err.message;
        } finally {
            loadingUsers = false;
        }
    }

    function closeModalCreate(){
        showModalCreate = false
    }

    function closeModalUpdate(){
        showModalUpdate = false
    }

</script>
<header>
    <h1>Persona Activity Manager</h1>
    <div>
        <select name="" id="" bind:value={category}>
            {#each data as item}
                <option value={item.id}>{item.description}</option>
            {/each}
        </select>
        <button on:click={()=>{showModalCreate = true}}><PlusIcon/></button>
        {#if category!==""}
            <button on:click={()=>{
                refreshPage()
                fetchDeleteCategory()
            }}><TrashIcon/></button>
            <button on:click={()=>{showModalUpdate = true}}><PencilIcon/></button>
        {/if}
        <ModalCreateCategory show={showModalCreate} setShow={closeModalCreate}/>
        {#if category!==""}
            <ModalUpdateCategory id={category} show={showModalUpdate} setShow={closeModalUpdate}/>
        {/if}
    </div>
    
</header>
<style>
    header{
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        align-items: center;
        width: 100%;
        height: 3rem;
        border-bottom: 2px rgb(178, 178, 178) solid;
    }

    div{
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: 20rem;
    }

    select{
        width: 15rem;
        height: 2rem;
        font-size: 1rem;
        border-radius: 5px;
        border: 2px rgb(51, 7, 147) solid;
    }

    button{
        background-color: transparent;
        color: rgb(51, 7, 147);
        border-radius: 5px;
        border: 2px rgb(51, 7, 147) solid;
    }

</style>