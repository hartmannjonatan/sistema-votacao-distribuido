# Makefile para criar rede privada com Besu
include .env
export

# Configuração dos containers
DOCKER_IMAGE = hyperledger/besu:latest
NETWORK_NAME = besu-network
GENESIS_FILE = genesis/genesis.json
VALIDATOR_RPC_PORT = 8545
VALIDATOR_P2P_PORT = 30303

# Diretório onde os containers estão localizados
NODE_DIR = nodes

write-key:
	@mkdir -p besu-genesis-data
	@echo $(NODE_PRIVATE_KEY) > besu-genesis-data/key

# Alvo "genesis": Cria o nó gerador
genesis: write-key

	@echo "Criando nó gerador..."
	docker run -d --name besu-genesis \
		-v $(PWD)/$(GENESIS_FILE):/genesis.json \
		-v $(PWD)/besu-genesis-data/key:/opt/besu/key \
		-p 8545:8545 \
		-p 30303:30303 \
		--network host \
		$(DOCKER_IMAGE) \
		--genesis-file /genesis.json \
		--data-path=/opt/besu \
		--node-private-key-file=/opt/besu/key \
		--sync-min-peers=0 \
		--rpc-http-enabled --rpc-http-api=ADMIN,ETH,NET,WEB3,DEBUG,MINER,CLIQUE \
		--rpc-http-cors-origins="*" \
		--host-allowlist="*"

	@sleep 15

	@echo "Nó gerador criado!"
	@echo "O endereço do nó: $(NODE_ADDRESS)"
	@echo "Chave privada do nó: $(NODE_PRIVATE_KEY)"
	@echo "Enode do nó gênesis: $$(curl -s -X POST --data '{"jsonrpc":"2.0","method":"admin_nodeInfo","params":[],"id":1}' localhost:8545 | grep -oE 'enode://([0-9A-Fa-f]{128})@(([0-9]|\.|:)*)')"

propose-validator:
	@if [ -z "$(GENESIS_IP)" ]; then \
		echo "Erro: Não foi possível obter o ip do nó gerador!"; \
		exit 1;\
	fi
	@if [ -z "$(VALIDATOR_ADDRESS)" ]; then \
		echo "Erro: Não foi possível obter o endereço do nó validador!"; \
		exit 1;\
	fi
	curl -s -X POST --data '{"jsonrpc":"2.0","method":"clique_propose","params":["'"$$VALIDATOR_ADDRESS"'", true], "id":1}' \
		http://$(GENESIS_IP);

# Alvo "validator": Cria um nó validador e conecta ao nó gerador
validator:
	# Verifica se o endereço do nó gerador foi passado como parâmetro
	@if [ -z "$(GENESIS_NODE_ADDRESS)" ]; then \
		GENESIS_NODE_ADDRESS=$$(curl -s -X POST http://localhost:8545 -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"admin_nodeInfo","params":[],"id":1}' | jq -r '.result.enode'); \
		if [ -z "$$GENESIS_NODE_ADDRESS" ]; then \
			echo "Erro: Não foi possível obter o enode do nó gerador!"; \
			exit 1; \
		fi; \
	fi

	@echo $(GENESIS_NODE_ADDRESS)
	
	# Cria o nó validador
	@echo "Criando nó validador..."
	docker run -d --name besu-validator \
		-v ./$(GENESIS_FILE):/opt/besu/genesis.json \
		-v ./besu-validator-data:/opt/besu/data \
		-p $(VALIDATOR_RPC_PORT):8545	 \
		-p $(VALIDATOR_P2P_PORT):30303 \
		$(DOCKER_IMAGE) \
		--genesis-file genesis.json \
		--sync-min-peers=0 \
		--rpc-http-enabled --rpc-http-api=ADMIN,ETH,NET,WEB3,DEBUG,MINER,CLIQUE \
		--bootnodes $(GENESIS_NODE_ADDRESS) \
		--rpc-http-cors-origins="*" \
		--host-allowlist="*"

	@sleep 10; \
	PASS=$$(docker exec -it besu-validator cat /opt/besu/key); \
	ADDRESS=$$(curl -s -X POST http://localhost:$(VALIDATOR_RPC_PORT) \
		-H "Content-Type: application/json" \
		--data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":1}' \
		| grep -oE '"0x([0-9a-fA-F]{40})"' | tr -d '"'); \
	echo "Nó validador criado."; \
	echo "O endereço do nó: $$ADDRESS"; \
	echo "Chave privada do nó: $$PASS"

clean-genesis:
	docker stop besu-genesis
	docker remove besu-genesis
	@echo "Container besu-genesis removido com sucesso!"

clean-validator:
	docker stop besu-validator
	docker remove besu-validator
	@echo "Container besu-validator removido com sucesso!"
