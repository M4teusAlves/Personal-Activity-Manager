<script>
    import { PencilIcon, PlusIcon, TrashIcon } from "lucide-svelte";
    import ModalUpdateActivity from "./ModalUpdateActivity.svelte";
    export let activity;

    let showModalUpdateActivity = false;

    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

    let createdAt = new Date(activity.createdAt)

    let updatedAt = new Date(activity.updatedAt)

    // @ts-ignore
    createdAt = createdAt.toLocaleDateString('pt-BR', options);

    // @ts-ignore
    updatedAt = updatedAt.toLocaleDateString('pt-BR', options);

    async function fetchDeleteActivity() {
        console.log(activity)
        try {
            const response = await fetch(`http://localhost:3001/activity/${activity.id}`, {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
        } catch (err) {
            console.log(err)
        } 
    }

    function closeModalUpdate(){
        showModalUpdateActivity = false
    }

    function refreshPage() {
        location.reload();
    }



</script>
<div class="container">
    <header>
        <button on:click={()=>{showModalUpdateActivity = true}}><PencilIcon/></button>
        <button on:click={()=>{fetchDeleteActivity(); refreshPage()}}><TrashIcon/></button>
    </header>
    <p><b>Descrição: </b>{activity.description}</p>
    <p><b>Categoria: </b>{activity.category.description}</p>
    <p><b>Criado em: </b>{createdAt}</p>
    <p><b>Atualizado em: </b>{updatedAt}</p>
    <ModalUpdateActivity id={activity.id} show={showModalUpdateActivity} setShow={closeModalUpdate}/>
</div>
<style>
    .container{
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        padding: 0.5rem;
        border-radius: 20px;
        border: 1px solid ;
        height: 10rem;
        width: 25rem;
    }
    header{
        display: flex;
        justify-content: end;
        padding: 0.2rem;
        gap: 0.2rem;
    }
    button{
        background-color: transparent;
        color: rgb(51, 7, 147);
        border-radius: 5px;
        border: 2px rgb(51, 7, 147) solid;
    }
</style>