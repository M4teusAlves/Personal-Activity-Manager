<script>
    import { PencilIcon, PlusIcon, TrashIcon } from "lucide-svelte";
    import { createEventDispatcher, onMount} from "svelte";
    import ModalCreateUser from "./User/ModalCreateUser.svelte";
    import ModalUpdateUser from "./User/ModalUpdateUser.svelte";

    let data = [];
    let user = "";
    let loadingData = true;
    let loadingUsers = true;
    let errorData = null;
    let errorUsers = null;
    let showModalCreate = false;
    let showModalUpdate = false;

    onMount(fetchUsers);

    function refreshPage() {
        location.reload();
    }


    async function fetchUsers() {
        loadingUsers = true;
        try {
            const response = await fetch('http://localhost:3001/user', {
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

    async function fetchDeleteUser() {
        loadingUsers = true;
        try {
            const response = await fetch(`http://localhost:3001/user/${user}`, {
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

    const dispatch = createEventDispatcher();

    export function selectUser() {
        // Passando dados no evento
        dispatch('select', { id: user});
    }

    function closeModalCreate(){
        showModalCreate = false
    }

    function closeModalUpdate(){
        showModalUpdate = false
    }


</script>
<footer>
    <select name="" id="" bind:value={user} on:change={selectUser}>
        {#each data as item}
            <option value={item.id}>{`${item.firstName} ${item.lastName}`}</option>
        {/each}
    </select>
    <button on:click={()=>{showModalCreate = true}}><PlusIcon/></button>
    {#if user!==""}
        <button on:click={()=>{
            refreshPage()
            fetchDeleteUser()
        }}><TrashIcon/></button>
        <button on:click={()=>{showModalUpdate = true}}><PencilIcon/></button>
    {/if}
    <ModalCreateUser show={showModalCreate} setShow={closeModalCreate}/>
    {#if user!==""}
        <ModalUpdateUser id={user} show={showModalUpdate} setShow={closeModalUpdate}/>
    {/if}
    
</footer>
<style>
    footer{
        height: 4rem;
        width: 100%;
        gap: 0.5rem;
        display: flex;
        align-items: center;
        border-top: 2px rgb(178, 178, 178) solid;
        padding: 0.5rem;
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