<script>
  import { onMount } from 'svelte';
  import { PencilIcon, PlusIcon, TrashIcon } from "lucide-svelte";
  import Footer from './lib/Footer.svelte';
  import Header from './lib/Header.svelte';
  import Activity from './lib/Activity/Activity.svelte';
  import ModalCreateActivity from './lib/Activity/ModalCreateActivity.svelte';

  let data = { activities: [] };
  let idUser = "";
  let dataUsers = [];
  let loadingData = true;
  let loadingUsers = true;
  let errorData = null;
  let errorUsers = null;
  let showModalCreateActivity = false;


  onMount(fetchUser);
  

  async function fetchUser() {
    if (!idUser) return;
    loadingData = true;
    try {
      const response = await fetch(`http://localhost:3001/user/${idUser}`, {
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
      errorData = err.message;
    } finally {
      loadingData = false;
    }
  }

  function handleUser(event) {
    idUser = event.detail.id;
    console.log(idUser)
    fetchUser();
  }

  function closeModalCreate(){
        showModalCreateActivity = false
  }

  

</script>

<div class="principal">
  <Header/>
  {#if idUser!==""}
        <button on:click={()=>{showModalCreateActivity = true}}>Adicionar Atividade <PlusIcon/></button>
  {/if}
  <main>
      
      
      {#each data.activities as item}
        <Activity activity={item}/>
      {/each}   
  </main>
  <ModalCreateActivity userID={idUser} show={showModalCreateActivity} setShow={closeModalCreate}/>
  
  <Footer on:select = {handleUser}/>
</div>
<style>
  .principal{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    width: 100%;
  }
  main{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 97%;
    height: 40rem;
    gap: 0.5rem;
  }
  button{
    display: flex;
    padding: 0.5rem;
    gap: 0.3rem ;
    align-items: center; 
    width: 12rem;
    font-size: 1rem;
    background-color: transparent;
    color: rgb(51, 7, 147);
    border-radius: 5px;
    border: 2px rgb(51, 7, 147) solid;
  }
</style>
