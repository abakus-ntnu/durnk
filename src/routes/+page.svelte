<script lang="ts">
  import {SignIn, SignOut} from "@auth/sveltekit/components"
  import { page } from "$app/state"
  import {buyableThings} from "$lib/buyableThings";
  let { form } = $props();
</script>

<header>
  <nav>
    {#if form}
      <h2>
        <marquee bgcolor={form.status < 300 ? "green" :"red"}>
          <font color="white">
            {form.body.message}
          </font>
        </marquee>
      </h2>
    {/if}
    {#if page.data.session}
      <h1>Velkommen {page.data.session?.user?.email}!</h1>
      <SignOut>
        <span slot="submitButton">Logg ut</span>
      </SignOut>

      <h2>Ta fra skapet:</h2>
      {#each buyableThings as thing}
        <form method="POST">
          <button>
            <input name="thing" value={thing.name} type="hidden"/>
            <img src={thing.image} alt={thing.displayName} height="200">
            <br/>
            {thing.displayName}
          </button>
        </form>
        <br/>
      {/each}
      <p>Fyller du på? Ta kontakt med Teknikk</p>
    {:else}
      <SignIn provider="authentik">
        <span slot="submitButton">Logg inn med abakus.no</span>
      </SignIn>
    {/if}
  </nav>
</header>