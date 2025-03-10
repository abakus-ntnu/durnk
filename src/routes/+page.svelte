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
      <h1>Velkommen {page.data.session?.user?.name}!</h1>
      <p>{page.data.session?.user?.email}</p>
      <table>
        <tbody>
          <tr>
            <td>
              <SignOut>
                <span slot="submitButton"><p/>Logg ut<p/></span>
              </SignOut>
            </td>
            <td>
              <a href="/fill">
                <button>
                  <p/>
                  Fyll på
                  <p/>
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Ta fra skapet:</h2>
      {#each buyableThings as thing}
        <form method="POST">
          <input name="thing" value={thing.name} type="hidden"/>
          <button>
            <img src={thing.image} alt={thing.displayName} height="200">
            <br/>
            {thing.displayName}
          </button>
        </form>
        <br/>
      {/each}
    {:else}
      <SignIn provider="authentik">
        <p/>
        <span slot="submitButton">Logg inn med abakus.no</span>
        <p/>
      </SignIn>
    {/if}
  </nav>
</header>