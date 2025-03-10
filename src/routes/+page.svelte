<script lang="ts">
  import {SignIn, SignOut} from "@auth/sveltekit/components"
  import { page } from "$app/state"
  import {signOut} from "@auth/sveltekit/client";
  import {buyableThings} from "$lib/buyableThings";

  const buyThing = (name: string) => {
    console.log(`Buying ${name}`)
    signOut()
  }
</script>

<header>
  <nav>
    {#if page.data.session}
      <h1>Velkommen {page.data.session?.user?.email}!</h1>

      <h2>Ta fra skapet:</h2>
      {#each buyableThings as thing}
        <button on:click={() => buyThing(thing.name)}>{thing.displayName}</button><br/>
      {/each}
      <SignOut>
        <span slot="submitButton">Logg ut</span>
      </SignOut>
      <p>Fyller du på? Ta kontakt med Teknikk</p>
    {:else}
      <SignIn provider="authentik">
        <span slot="submitButton">Logg inn med abakus.no</span>
      </SignIn>
    {/if}
  </nav>
</header>