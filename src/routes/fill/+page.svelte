<script lang="ts">
    import {SignIn} from "@auth/sveltekit/components"
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
            <table>
                <tbody>
                <tr>
                    <td>
                        <a href="/">
                            <button>
                                <p/>
                                Tilbake
                                <p/>
                            </button>
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>

            <h2>Fyll på i skapet:</h2>
            <form method="POST">
                <label for="amount">Antall</label>
                <input size="1" type="number" name="amount" value="1" height="200" />
                <br/>
                <br/>
                <label for="thing">Ting</label>
                <select name="thing">
                {#each buyableThings as thing}
                    <option value={thing.name}>{thing.displayName}</option>
                {/each}
                </select>
                <br/>
                <br/>
                <button>Submit</button>
            </form>
        {:else}
            <SignIn provider="authentik">
                <span slot="submitButton">Logg inn med abakus.no</span>
            </SignIn>
        {/if}
    </nav>
</header>