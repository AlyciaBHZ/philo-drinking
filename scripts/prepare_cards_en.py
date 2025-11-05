from __future__ import annotations

import json
import re
from pathlib import Path

NAME_OVERRIDES = {
    "marx_seize_the_means": "Karl Marx",
    "beauvoir_existential_link": "Simone de Beauvoir",
    "camus_sisyphus": "Albert Camus",
    "hume_problem_of_induction": "David Hume",
    "locke_tabula_rasa": "John Locke",
    "heidegger_angst": "Martin Heidegger",
    "aquinas_unmoved_mover": "Thomas Aquinas",
    "augustine_confessions": "Saint Augustine",
    "foucault_panopticon": "Michel Foucault",
    "derrida_deconstruction": "Jacques Derrida",
    "spinoza_pantheism": "Baruch Spinoza",
    "bentham_utilitarianism": "Jeremy Bentham",
    "mill_harm_principle": "John Stuart Mill",
    "kierkegaard_leap_of_faith": "Søren Kierkegaard",
    "zhuangzi_butterfly_dream": "Zhuangzi",
    "montesquieu_separation_of_powers": "Baron de Montesquieu",
    "rousseau_chains": "Jean-Jacques Rousseau",
    "schopenhauer_pendulum": "Arthur Schopenhauer",
    "sartre_sum_of_choices": "Jean-Paul Sartre",
    "camus_nostalgia": "Albert Camus",
    "dennett_computational_mind": "Daniel Dennett",
    "zhuxi_gewu_zhizhi": "Zhu Xi",
    "nietzsche_turin_horse": "Friedrich Nietzsche",
    "aristotle_syllogism": "Aristotle",
    "confucius_propriety": "Confucius",
    "kant_categorical_imperative": "Immanuel Kant",
    "wittgenstein_language_game": "Ludwig Wittgenstein",
    "arendt_banality_of_evil": "Hannah Arendt",
    "leibniz_best_of_all_possible_worlds": "Gottfried Wilhelm Leibniz",
    "plato_allegory_of_the_cave": "Plato",
    "socrates_elenchus": "Socrates",
    "descartes_cogito": "René Descartes",
    "hobbes_leviathan": "Thomas Hobbes",
    "pascal_wager": "Blaise Pascal",
    "machiavelli_the_prince": "Niccolò Machiavelli",
    "laozi_wu_wei": "Laozi",
    "sun_tzu_art_of_war": "Sun Tzu",
    "diogenes_cynic": "Diogenes",
    "berkeley_to_be_is_to_be_perceived": "George Berkeley",
    "hegel_dialectic": "Georg Wilhelm Friedrich Hegel",
    "wollstonecraft_vindication": "Mary Wollstonecraft",
    "baudrillard_simulacra": "Jean Baudrillard",
    "zeno_paradox": "Zeno of Elea",
    "epicurus_ataraxia": "Epicurus",
    "judith_butler_performativity": "Judith Butler",
    "rawls_veil_of_ignorance": "John Rawls",
    "schrodinger_cat": "Erwin Schrödinger",
    "epictetus_stoicism": "Epictetus",
    "freud_id_ego_superego": "Sigmund Freud",
    "susan_sontag_against_interpretation": "Susan Sontag",
    "byung_chul_han_burnout_society": "Byung-Chul Han",
    "confucius_golden_rule": "Confucius",
    "democritus_atomism": "Democritus",
    "nietzsche_eternal_recurrence": "Friedrich Nietzsche",
    "mencius_good_nature": "Mencius",
    "han_fei_legalism": "Han Fei",
    "adam_smith_invisible_hand": "Adam Smith",
    "russell_teapot": "Bertrand Russell",
    "popper_falsifiability": "Karl Popper",
    "buddha_samsara": "Buddha (Siddhartha Gautama)",
    "william_james_pragmatism": "William James",
    "saussure_signifier_signified": "Ferdinand de Saussure",
    "thomas_more_utopia": "Thomas More",
    "einstein_relativity": "Albert Einstein",
}

TITLE_OVERRIDES = {
    "marx_seize_the_means": "Seize the Means of Production",
    "beauvoir_existential_link": "Existential Link",
    "camus_sisyphus": "Absurd Sisyphus",
    "hume_problem_of_induction": "Problem of Induction",
    "locke_tabula_rasa": "Tabula Rasa",
    "heidegger_angst": "Dasein's Angst",
    "aquinas_unmoved_mover": "Unmoved Mover",
    "augustine_confessions": "\"Lord, Grant Me Chastity...But Not Yet\"",
    "foucault_panopticon": "Panopticon",
    "derrida_deconstruction": "Différance",
    "spinoza_pantheism": "All Is Divine",
    "bentham_utilitarianism": "Greatest Happiness",
    "mill_harm_principle": "Harm Principle",
    "kierkegaard_leap_of_faith": "Leap of Faith",
    "zhuangzi_butterfly_dream": "Butterfly Dream",
    "montesquieu_separation_of_powers": "Separation of Powers",
    "rousseau_chains": "Born Free, Everywhere in Chains",
    "schopenhauer_pendulum": "Pendulum of Pain and Boredom",
    "sartre_sum_of_choices": "Sum of Our Choices",
    "camus_nostalgia": "Resistance and Nostalgia",
    "dennett_computational_mind": "Black Box Mind",
    "zhuxi_gewu_zhizhi": "Investigate Things, Extend Knowledge",
    "nietzsche_turin_horse": "Stare into the Abyss",
    "aristotle_syllogism": "Logical Syllogism",
    "confucius_propriety": "Self-Discipline and Ritual",
    "kant_categorical_imperative": "Categorical Imperative",
    "wittgenstein_language_game": "Limits of Language",
    "arendt_banality_of_evil": "Banality of Evil",
    "leibniz_best_of_all_possible_worlds": "Best of All Possible Worlds",
    "plato_allegory_of_the_cave": "Allegory of the Cave",
    "socrates_elenchus": "Know Thyself",
    "descartes_cogito": "I Drink, Therefore I Am",
    "hobbes_leviathan": "Leviathan",
    "pascal_wager": "Pascal's Wager",
    "machiavelli_the_prince": "The Prince",
    "laozi_wu_wei": "Wu Wei",
    "sun_tzu_art_of_war": "Art of War",
    "diogenes_cynic": "The Cynic",
    "berkeley_to_be_is_to_be_perceived": "To Be Is to Be Perceived",
    "hegel_dialectic": "Dialectic (Thesis–Antithesis–Synthesis)",
    "wollstonecraft_vindication": "Vindication of Reason",
    "baudrillard_simulacra": "Simulacra and Hyperreality",
    "zeno_paradox": "Achilles and the Tortoise",
    "epicurus_ataraxia": "Ataraxia",
    "judith_butler_performativity": "Gender Performativity",
    "rawls_veil_of_ignorance": "Veil of Ignorance",
    "schrodinger_cat": "Schrödinger's Cat",
    "epictetus_stoicism": "Stoic Calm",
    "freud_id_ego_superego": "Id, Ego, Superego",
    "susan_sontag_against_interpretation": "Against Interpretation",
    "byung_chul_han_burnout_society": "Burnout Society",
    "confucius_golden_rule": "Golden Rule",
    "democritus_atomism": "Atomism",
    "nietzsche_eternal_recurrence": "Eternal Recurrence",
    "mencius_good_nature": "Innate Goodness",
    "han_fei_legalism": "Legalist Edict",
    "adam_smith_invisible_hand": "Invisible Hand",
    "russell_teapot": "Russell's Teapot",
    "popper_falsifiability": "Falsifiability",
    "buddha_samsara": "Saṃsāra",
    "william_james_pragmatism": "Pragmatism",
    "saussure_signifier_signified": "Signifier and Signified",
    "thomas_more_utopia": "Utopia",
    "einstein_relativity": "Relativity",
}

PUNCT_TRANSLATION = str.maketrans({
    "“": '"',
    "”": '"',
    "‘": "'",
    "’": "'",
    "—": "-",
    "–": "-",
    "…": "...",
    "【": "[",
    "】": "]",
    "（": "(",
    "）": ")",
})

REPLACEMENTS = [
    ("[Big Adventure]", "[Dare]"),
    ("[Adventure]", "[Dare]"),
    ("[True words]", "[Truth]"),
    ("【真心话】", "[Truth]"),
    ("【大冒险】", "[Dare]"),
    ("【大冒】", "[Dare]"),
    ("【Adventure】", "[Dare]"),
    ("sip of wine", "sip"),
    ("glass of wine", "glass"),
    ("wine glass", "glass"),
    ("[Truthfully]", "[Truth]"),
]

LABEL_SPACE_FIX = re.compile(r"(\[(?:Truth|Dare)\])(?=\S)")


def clean(text: str | None) -> str | None:
    if not text:
        return text
    result = text.translate(PUNCT_TRANSLATION)
    for old, new in REPLACEMENTS:
        result = result.replace(old, new)
    while "  " in result:
        result = result.replace("  ", " ")
    result = LABEL_SPACE_FIX.sub(r"\1 ", result)
    return result.strip()


def main() -> None:
    path = Path("public/cards.en.json")
    cards = json.loads(path.read_text(encoding="utf-8"))
    for card in cards:
        card_id = card["id"]
        if card_id in NAME_OVERRIDES:
            card["philosopher"] = NAME_OVERRIDES[card_id]
        if card_id in TITLE_OVERRIDES:
            card["title"] = TITLE_OVERRIDES[card_id]
        for field in ("background", "summary", "detail", "alt"):
            card[field] = clean(card.get(field))
    path.write_text(json.dumps(cards, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
