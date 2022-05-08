<form @submit.prevent="submit">
      <div class="flex flex-col gap-y-5 w-full">
        <select v-model="send['coffee-type']" class="select select-primary">
          <option disabled selected value="">
            Select one coffee according to your mood
          </option>
          <option value="black">Black</option>
          <option value="americano">Americano</option>
          <option value="latte">Latte</option>
          <option value="cappuccino">Cappuccino</option>
          <option value="espresso">Espresso</option>
          <option value="doppio">Doppio</option>
          <option value="cortado">Cortado</option>
          <option value="red-eye">Red Eye</option>
          <option value="galao">Galão</option>
          <option value="lungo">Lungo</option>
          <option value="macchiato">Macchiato</option>
          <option value="mocha">Mocha</option>
          <option value="ristretto">Ristretto</option>
          <option value="flat-white">Flat White</option>
          <option value="affogato">Affogato</option>
          <option value="cafe-au-lait">Café Au Lait</option>
          <option value="irish">Irish</option>
        </select>
        <input
          v-model="send.content"
          class="textarea resize-none textarea-primary"
          placeholder="How are you feeling today?"
        />
        <button
          type="submit"
          class="btn btn-accent text-md sm:text-lg md:text-lg normal-case"
        >
          <i class="bx bx-coffee-togo mr-1 text-2xl"></i>Brew
        </button>
        <NuxtLink
          to="/moods"
          class="btn btn-primary text-md sm:text-lg md:text-lg normal-case"
        >
          <i class="bx bxs-coffee mr-1 text-2xl"></i>View Your Posts
        </NuxtLink>
      </div>
    </form>
