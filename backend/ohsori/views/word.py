from symspellpy_ko import KoSymSpell, Verbosity #symspellpy 기반 단어 교정 라이브러리
from jamo import h2j, j2hcj
from unicode import join_jamos # unicode.py 불러오기

def word_correction(text):
    whole_words = ['검색', '찜목록', '회원정보수정', '고객센터', '더보기','일번','이번','삼번','사번','오번']
    if text in whole_words:
        return text
    
    word_jamo = j2hcj(h2j(text)) # 단어를 자소로 분해하기 겅생 -> ㄱㅓㅇㅅㅐㅇ
    temp = sym_spell.lookup(word_jamo, Verbosity.ALL, max_edit_distance=2)
    
    if not temp:
        return '다시 말씀해주세요'
    else:
        for suggestion in temp:
            text_correction = suggestion.term
            return join_jamos(text_correction)