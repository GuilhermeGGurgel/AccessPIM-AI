import requests
import time

# URL do seu servidor Node.js local
URL_SERVIDOR = "http://localhost:3000/api/registro"

def processar_acesso(matricula, nome, area, permitido):
    print(f"\n[EDGE] Processando biometria de: {nome}...")
    time.sleep(1) # Simula o processamento na borda
    
    if permitido:
        status = "Autorizado"
        print(f"[SUCESSO] ACESSO LIBERADO! Bem-vindo(a), {nome}.")
        print("[HARDWARE] Enviando sinal para destravar solenoide da catraca...")
    else:
        status = "Negado"
        print(f"[NEGADO] ACESSO NEGADO! Funcionario {nome} sem permissao para esta area.")
        print("[HARDWARE] Mantendo catraca travada.")

    # Sincronizacao com o Servidor Central (Nuvem)
    payload = {
        "matricula": matricula,
        "area": area,
        "status": status
    }
    
    try:
        print(f"\n[EDGE] Sincronizando registro com a Nuvem...")
        resposta = requests.post(URL_SERVIDOR, json=payload)
        
        if resposta.status_code == 201:
            print(f"[NUVEM] Resposta: {resposta.json()['mensagem']}")
        else:
            print(f"[NUVEM] Erro no servidor: {resposta.status_code}")
            
    except requests.exceptions.ConnectionError:
        print("[ALERTA] Servidor Offline. Registro salvo em cache local (Tolerancia a Falhas).")

def menu_simulacao():
    print("="*50)
    print("      SIMULADOR DE ACESSO - EDGE COMPUTING      ")
    print("="*50)
    
    while True:
        print("\n--- TESTE DE ACESSO ---")
        print("[1] Simular Funcionario PERMITIDO (Joao)")
        print("[0] Simular Funcionario NEGADO (Estranho)")
        print("[S] Sair do Simulador")
        
        opcao = input("\nDigite o comando: ").upper()
        
        if opcao == '1':
            processar_acesso("MAT001", "Joao Silva", "Sala de Servidores", True)
        elif opcao == '0':
            processar_acesso("MAT_UNK", "Desconhecido", "Sala de Servidores", False)
        elif opcao == 'S':
            print("Encerrando simulador...")
            break
        else:
            print("Opcao invalida!")
        
        print("\n" + "-"*30)

if __name__ == "__main__":
    menu_simulacao()