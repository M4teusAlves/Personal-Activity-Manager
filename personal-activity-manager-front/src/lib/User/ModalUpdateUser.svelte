<script>
    import { X } from "lucide-svelte";
    import { onMount } from "svelte";

    let loadingData = true;
    let errorData = null;
    let firstName = '';
    let lastName = '';

    let user

    export let id = "";


    export let show = false;

    export let setShow;

    onMount(fetchUser)


    async function fetchUser() {
      loadingData = true;
      try {
        const response = await fetch(`http://localhost:3001/user/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        user = await response.json()

        firstName = user.firstName
        lastName = user.lastName

      } catch (err) {
        errorData = err.message;
      } finally {
        loadingData = false;
      }
    } 

    async function fetchUpdateUser() {
      loadingData = true;
      try {
        const response = await fetch(`http://localhost:3001/user/${id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ firstName, lastName }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
      } catch (err) {
        errorData = err.message;
      } finally {
        loadingData = false;
      }
  }

  $: if (id) {
    fetchUser();
  }

</script>
{#if show}
    <div>
        <form on:submit={fetchUpdateUser}>
            <header>
                <h2>Atualização de Usuário</h2>
                <button on:click={setShow()}><X/></button>
            </header>
            
            <label for="firstName">
                Nome:
                <input type="text" bind:value={firstName} required maxlength="20">
            </label>
            <label for="lastName">
                Sobrenome
                <input type="text" bind:value={lastName} required maxlength="20">
            </label>
            <input type="submit" value="Atualizar Usuário">
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